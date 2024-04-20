import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CreateBookTable1623217646048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria a tabela Book
        await queryRunner.createTable(new Table({
            name: "book",
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
                    name: "authors",
                    type: "json",
                    isNullable: true,
                },
                {
                    name: "publishedYear",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "description",
                    type: "varchar",
                    length: "1000",
                    isNullable: true,
                },
                {
                    name: "edition",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "isbn",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "pageCount",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "categories",
                    type: "json",
                    isNullable: true,
                },
                {
                    name: "read",
                    type: "enum",
                    enum: ["not_read", "reading", "read"],
                    default: "'not_read'",
                },
                {
                    name: "collectionId",
                    type: "int",
                },
            ],
        }), true);

        // Adiciona a chave estrangeira collectionId
        await queryRunner.createForeignKey("book", new TableForeignKey({
            columnNames: ["collectionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "collection",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Desfaz a chave estrangeira
        const table = await queryRunner.getTable("book");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("collectionId") !== -1);
        await queryRunner.dropForeignKey("book", foreignKey);

        // Remove a tabela
        await queryRunner.dropTable("book");
    }

}