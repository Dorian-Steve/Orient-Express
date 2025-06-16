SELECT
  `t`.`id` AS `id`,
  `t`.`reference` AS `reference`,
  `t`.`name` AS `name`,
  `t`.`amount` AS `amount`,
  `b`.`name` AS `bank`,
  `br`.`name` AS `branch`,
  `br`.`town` AS `town`,
  `t`.`paymentDate` AS `paymentDate`,
  `p`.`name` AS `paymentMode`,
  `t`.`description` AS `description`,
  `s`.`name` AS `status`
FROM
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
WHERE
  (
    (`t`.`statusId` = 4)
    AND `t`.`reference` IN (
      SELECT
        `icn_cashing`.`assignments`.`reference`
      FROM
        `icn_cashing`.`assignments`
      WHERE
        (
          (`icn_cashing`.`assignments`.`deleted` = 0)
          AND (
            `icn_cashing`.`assignments`.`status` IN ('PENDING', 'VALIDATE')
          )
        )
    ) IS false
  )