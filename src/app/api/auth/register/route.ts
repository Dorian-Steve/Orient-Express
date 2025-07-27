// src/app/api/auth/register/route.ts
import { db } from "@/server/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, firstName, lastName, schoolId } = body;

  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const schoolCheck = await db.validSchoolId.findUnique({
      where: { schoolId },
    });

    if (!schoolCheck || schoolCheck.isUsed) {
      return NextResponse.json(
        { error: "Invalid or used School ID" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        schoolId,
        passwordHash: hashedPassword,
        validSchoolId: {
          connect: { schoolId },
        },
      },
    });

    await db.validSchoolId.update({
      where: { schoolId },
      data: { isUsed: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
