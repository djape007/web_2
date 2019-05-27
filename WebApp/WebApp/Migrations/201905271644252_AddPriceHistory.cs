namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPriceHistory : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PriceHistories",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        PricelistId = c.Guid(nullable: false),
                        ProductTypeId = c.Guid(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Pricelists", t => t.PricelistId, cascadeDelete: true)
                .ForeignKey("dbo.ProductTypes", t => t.ProductTypeId, cascadeDelete: true)
                .Index(t => t.PricelistId)
                .Index(t => t.ProductTypeId);
            
            CreateTable(
                "dbo.Pricelists",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        From = c.DateTime(nullable: false),
                        To = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProductTypes",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PriceHistories", "ProductTypeId", "dbo.ProductTypes");
            DropForeignKey("dbo.PriceHistories", "PricelistId", "dbo.Pricelists");
            DropIndex("dbo.PriceHistories", new[] { "ProductTypeId" });
            DropIndex("dbo.PriceHistories", new[] { "PricelistId" });
            DropTable("dbo.ProductTypes");
            DropTable("dbo.Pricelists");
            DropTable("dbo.PriceHistories");
        }
    }
}
