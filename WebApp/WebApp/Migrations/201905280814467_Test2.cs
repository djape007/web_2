namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Test2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Buses",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        X = c.Double(nullable: false),
                        Y = c.Double(nullable: false),
                        Line_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        LineCode = c.String(),
                        DirectionA = c.String(),
                        DirectionB = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
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
            
            CreateTable(
                "dbo.Timetables",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        TimesDirectionA = c.String(),
                        TimesDirectionB = c.String(),
                        ValidFrom = c.DateTime(nullable: false),
                        Line_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.Line_Id);
            
            DropTable("dbo.Products");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
            DropForeignKey("dbo.Timetables", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.PriceHistories", "ProductTypeId", "dbo.ProductTypes");
            DropForeignKey("dbo.PriceHistories", "PricelistId", "dbo.Pricelists");
            DropForeignKey("dbo.Buses", "Line_Id", "dbo.Lines");
            DropIndex("dbo.Timetables", new[] { "Line_Id" });
            DropIndex("dbo.PriceHistories", new[] { "ProductTypeId" });
            DropIndex("dbo.PriceHistories", new[] { "PricelistId" });
            DropIndex("dbo.Buses", new[] { "Line_Id" });
            DropTable("dbo.Timetables");
            DropTable("dbo.ProductTypes");
            DropTable("dbo.Pricelists");
            DropTable("dbo.PriceHistories");
            DropTable("dbo.Lines");
            DropTable("dbo.Buses");
        }
    }
}
