SELECT
  `t`.`id` AS `id`,
  `s`.`name` AS `status`,
  `t`.`reference` AS `reference`,
  `t`.`paymentDate` AS `paymentDate`,
  `t`.`name` AS `name`,
  `t`.`amount` AS `amount`,
  `b`.`name` AS `bank`,
  `br`.`name` AS `branch`,
  `p`.`name` AS `paymentMode`,
  `t`.`description` AS `description`,
  `icn_cashing`.`regions`.`name` AS `region`,
  `icn_cashing`.`units`.`name` AS `unit`,
  `uu`.`name` AS `user`
FROM
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
        LEFT JOIN `icn_cashing`.`regions` ON((`t`.`regionId` = `icn_cashing`.`regions`.`id`))
      )
      LEFT JOIN `icn_cashing`.`units` ON((`t`.`unitId` = `icn_cashing`.`units`.`id`))
    )
    LEFT JOIN `icn_cashing`.`users` `uu` ON((`t`.`userId` = `uu`.`id`))
  )
WHERE
  (
    (`t`.`statusId` = 6)
    AND `t`.`id` IN (
      SELECT
        `icn_cashing`.`transaction_details`.`transactionId`
      FROM
        `icn_cashing`.`transaction_details`
      WHERE
        (
          `icn_cashing`.`transaction_details`.`deleted` = 0
        )
    ) IS false
  )