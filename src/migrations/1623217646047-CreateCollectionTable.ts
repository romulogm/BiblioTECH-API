import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CreateCollectionTable1623217646047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria a tabela Collection
        await queryRunner.createTable(new Table({
            name: "collection",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "userId",
                    type: "int",
                },
            ],
        }), true);

        // Adiciona a chave estrangeira userId
        await queryRunner.createForeignKey("collection", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Desfaz a chave estrangeira
        const table = await queryRunner.getTable("collection");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("collection", foreignKey);

        // Remove a tabela
        await queryRunner.dropTable("collection");
    }

}