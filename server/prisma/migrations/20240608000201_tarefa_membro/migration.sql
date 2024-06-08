-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Member_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tarefa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `descricao` VARCHAR(140) NULL,
    `finalizada` BOOLEAN NOT NULL DEFAULT false,
    `data_termino` VARCHAR(191) NOT NULL,
    `prioridade` ENUM('baixa', 'media', 'alta') NOT NULL,
    `membroEmail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tarefa` ADD CONSTRAINT `Tarefa_membroEmail_fkey` FOREIGN KEY (`membroEmail`) REFERENCES `Member`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
