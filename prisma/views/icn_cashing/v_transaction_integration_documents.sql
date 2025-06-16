SELECT
  `id`.`transactionId` AS `transactionId`,
  `id`.`reference` AS `reference`,
  `id`.`transaction_id` AS `transaction_id`,
  `id`.`bill_account_number` AS `bill_account_number`,
  `id`.`bill_number` AS `bill_number`,
  `td`.`date` AS `billingDate`,
  `t`.`name` AS `customerName`,
  `id`.`paid_amount` AS `paid_amount`,
  `id`.`paid_date` AS `paid_date`,
  greatest((`td`.`amountTopaid` - `td`.`amountUnpaid`), 0) AS `advancePayment`
FROM
  (
    (
      `icn_cashing`.`integration_documents` `id`
      JOIN `icn_cashing`.`transaction_details` `td` ON((`id`.`transactionDetailsId` = `td`.`id`))
    )
    JOIN `icn_cashing`.`transactions` `t` ON((`id`.`transactionId` = `t`.`id`))
  )