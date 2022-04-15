-- CreateTable
CREATE TABLE `admin_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` CHAR(5) NOT NULL,
    `phone` CHAR(11) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `is_super` INTEGER NOT NULL DEFAULT 0,
    `remark` VARCHAR(255) NULL,
    `create_time` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `admin_user_account_key`(`account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `f_id` INTEGER NULL,
    `s_id` INTEGER NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `type` INTEGER NOT NULL,
    `remark` VARCHAR(255) NULL,

    UNIQUE INDEX `permission_code_key`(`code`),
    UNIQUE INDEX `permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
