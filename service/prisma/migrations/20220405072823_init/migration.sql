/*
  Warnings:

  - You are about to drop the column `f_id` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `s_id` on the `permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `permission` DROP COLUMN `f_id`,
    DROP COLUMN `s_id`,
    ADD COLUMN `parrent_id` INTEGER NULL;
