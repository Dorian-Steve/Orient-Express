import { ProgramCard } from "@/components/ui/programCard";
import { StaffMember } from "@/components/data/staff";

interface StaffCardProps {
  member: staff;
}

export const StaffCard: React.FC<StaffCardProps> = ({ member }) => (
  <div className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
    <div className="mb-4 flex items-center">
      {/* <img
        src={member.image}
        alt={member.name}
        className="mr-4 h-16 w-16 rounded-full object-cover"
      /> */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
        <p className="font-medium text-emerald-600">{member.role}</p>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex items-center text-sm text-gray-600">
        <Briefcase className="mr-2 h-4 w-4" />
        <span>{member.department}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Award className="mr-2 h-4 w-4" />
        <span>{member.experience}</span>
      </div>
    </div>
  </div>
);
