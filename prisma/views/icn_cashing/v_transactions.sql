SELECT
  `t`.`id` AS `id`,
  `t`.`reference` AS `reference`,
  `t`.`name` AS `name`,
  `t`.`amount` AS `amount`,
  `t`.`bankId` AS `bankId`,
  `b`.`name` AS `bank`,
  `t`.`branchId` AS `branchId`,
  `br`.`name` AS `branch`,
  `br`.`town` AS `town`,
  `t`.`paymentDate` AS `paymentDate`,
  `t`.`paymentModeId` AS `paymentModeId`,
  `p`.`name` AS `paymentMode`,
  `t`.`description` AS `description`,
  `t`.`statusId` AS `statusId`,
  `s`.`name` AS `status`,
  `t`.`advice_duplication` AS `advice_duplication`,
  `t`.`validatorId` AS `validatorId`,
  `uv`.`name` AS `validator`,
  `t`.`validatedAt` AS `validatedAt`,
  `t`.`assignBy` AS `assignBy`,
  `ua`.`name` AS `assignator`,
  `t`.`assignAt` AS `assignAt`,
  `t`.`verifierBy` AS `verifierBy`,
  `uve`.`name` AS `verificator`,
  `t`.`verifierAt` AS `verifierAt`,
  `t`.`refusal` AS `refusal`,
  `t`.`reasonForRefusal` AS `reasonForRefusal`,
  `t`.`userId` AS `userId`,
  `uu`.`name` AS `user`,
  `t`.`regionId` AS `regionId`,
  `icn_cashing`.`regions`.`name` AS `region`,
  `t`.`unitId` AS `unitId`,
  `icn_cashing`.`units`.`name` AS `unit`,
  `t`.`createdBy` AS `createdBy`,
  `ucre`.`name` AS `creator`,
  `t`.`created_at` AS `createdAt`,
  `umod`.`name` AS `modificator`,
  `t`.`updated_at` AS `updatedAt`
FROM
  (
    (
      (
        (
          (
            (
              (
                (
                  (
                    (
                      (
                        (
                          `icn_cashing`.`transactions` `t`
                          LEFT JOIN `icn_cashing`.`status` `s` ON((`t`.`statusId` = `s`.`id`))
                        )
                        LEFT JOIN `icn_cashing`.`banks` `b` ON((`t`.`bankId` = `b`.`id`))
                      )
                      LEFT JOIN `icn_cashing`.`bank_agencies` `br` ON((`t`.`branchId` = `br`.`id`))
                    )
                    LEFT JOIN `icn_cashing`.`payment_modes` `p` ON((`t`.`paymentModeId` = `p`.`id`))
                  )
                  LEFT JOIN `icn_cashing`.`users` `uv` ON((`t`.`validatorId` = `uv`.`id`))
                )
                LEFT JOIN `icn_cashing`.`users` `ua` ON((`t`.`assignBy` = `ua`.`id`))
              )
              LEFT JOIN `icn_cashing`.`users` `uve` ON((`t`.`assignBy` = `uve`.`id`))
            )
            LEFT JOIN `icn_cashing`.`users` `uu` ON((`t`.`userId` = `uu`.`id`))
          )
          LEFT JOIN `icn_cashing`.`users` `ucre` ON((`t`.`createdBy` = `ucre`.`id`))
        )
        LEFT JOIN `icn_cashing`.`users` `umod` ON((`t`.`modifiedBy` = `umod`.`id`))
      )
      LEFT JOIN `icn_cashing`.`regions` ON((`t`.`regionId` = `icn_cashing`.`regions`.`id`))
    )
    LEFT JOIN `icn_cashing`.`units` ON((`t`.`unitId` = `icn_cashing`.`units`.`id`))
  )