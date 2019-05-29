namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LastMigration : DbMigration
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
                "dbo.BusStops",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        X = c.Double(nullable: false),
                        Y = c.Double(nullable: false),
                        Name = c.String(),
                        Address = c.String(),
                        BusStop_Id = c.Guid(),
                        Line_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BusStops", t => t.BusStop_Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.BusStop_Id)
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.PointPathLines",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        X = c.Double(nullable: false),
                        Y = c.Double(nullable: false),
                        SequenceNumber = c.Int(nullable: false),
                        Line_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.BusStopsOnLines",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        BusStopId = c.Guid(nullable: false),
                        LineId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BusStops", t => t.BusStopId, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
                .Index(t => t.BusStopId)
                .Index(t => t.LineId);
            
            CreateTable(
                "dbo.Coefficients",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Type = c.String(),
                        Value = c.Double(nullable: false),
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
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SoldTickets",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Type = c.String(nullable: false),
                        UserId = c.Guid(nullable: false),
                        Expires = c.DateTime(nullable: false),
                        Usages = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                        DateOfPurchase = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Role = c.String(),
                        Status = c.String(),
                        Type = c.String(),
                        Password = c.String(),
                        Email = c.String(),
                        Name = c.String(),
                        Surname = c.String(),
                        DateOfBirth = c.DateTime(nullable: false),
                        Address = c.String(),
                        HasDocument = c.Boolean(nullable: false),
                        Files = c.String(),
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
            DropForeignKey("dbo.SoldTickets", "UserId", "dbo.Users");
            DropForeignKey("dbo.PriceHistories", "ProductTypeId", "dbo.ProductTypes");
            DropForeignKey("dbo.PriceHistories", "PricelistId", "dbo.Pricelists");
            DropForeignKey("dbo.BusStopsOnLines", "LineId", "dbo.Lines");
            DropForeignKey("dbo.BusStopsOnLines", "BusStopId", "dbo.BusStops");
            DropForeignKey("dbo.PointPathLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.BusStops", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.BusStops", "BusStop_Id", "dbo.BusStops");
            DropForeignKey("dbo.Buses", "Line_Id", "dbo.Lines");
            DropIndex("dbo.Timetables", new[] { "Line_Id" });
            DropIndex("dbo.SoldTickets", new[] { "UserId" });
            DropIndex("dbo.PriceHistories", new[] { "ProductTypeId" });
            DropIndex("dbo.PriceHistories", new[] { "PricelistId" });
            DropIndex("dbo.BusStopsOnLines", new[] { "LineId" });
            DropIndex("dbo.BusStopsOnLines", new[] { "BusStopId" });
            DropIndex("dbo.PointPathLines", new[] { "Line_Id" });
            DropIndex("dbo.BusStops", new[] { "Line_Id" });
            DropIndex("dbo.BusStops", new[] { "BusStop_Id" });
            DropIndex("dbo.Buses", new[] { "Line_Id" });
            DropTable("dbo.Timetables");
            DropTable("dbo.Users");
            DropTable("dbo.SoldTickets");
            DropTable("dbo.ProductTypes");
            DropTable("dbo.Pricelists");
            DropTable("dbo.PriceHistories");
            DropTable("dbo.Coefficients");
            DropTable("dbo.BusStopsOnLines");
            DropTable("dbo.PointPathLines");
            DropTable("dbo.BusStops");
            DropTable("dbo.Lines");
            DropTable("dbo.Buses");
        }
    }
}
