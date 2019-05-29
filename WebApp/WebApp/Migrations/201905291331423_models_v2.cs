namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class models_v2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BusStops", "BusStop_Id", "dbo.BusStops");
            DropForeignKey("dbo.BusStops", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.Buses", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.PointPathLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.Timetables", "Line_Id", "dbo.Lines");
            DropIndex("dbo.Buses", new[] { "Line_Id" });
            DropIndex("dbo.BusStops", new[] { "BusStop_Id" });
            DropIndex("dbo.BusStops", new[] { "Line_Id" });
            DropIndex("dbo.PointPathLines", new[] { "Line_Id" });
            DropIndex("dbo.Timetables", new[] { "Line_Id" });
            RenameColumn(table: "dbo.Buses", name: "Line_Id", newName: "LineId");
            RenameColumn(table: "dbo.PointPathLines", name: "Line_Id", newName: "LineId");
            RenameColumn(table: "dbo.Timetables", name: "Line_Id", newName: "LineId");
            AlterColumn("dbo.Buses", "LineId", c => c.Guid(nullable: false));
            AlterColumn("dbo.PointPathLines", "LineId", c => c.Guid(nullable: false));
            AlterColumn("dbo.ProductTypes", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.SoldTickets", "Type", c => c.String(nullable: false));
            AlterColumn("dbo.Timetables", "LineId", c => c.Guid(nullable: false));
            CreateIndex("dbo.Buses", "LineId");
            CreateIndex("dbo.PointPathLines", "LineId");
            CreateIndex("dbo.Timetables", "LineId");
            AddForeignKey("dbo.Buses", "LineId", "dbo.Lines", "Id", cascadeDelete: true);
            AddForeignKey("dbo.PointPathLines", "LineId", "dbo.Lines", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Timetables", "LineId", "dbo.Lines", "Id", cascadeDelete: true);
            DropColumn("dbo.BusStops", "BusStop_Id");
            DropColumn("dbo.BusStops", "Line_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BusStops", "Line_Id", c => c.Guid());
            AddColumn("dbo.BusStops", "BusStop_Id", c => c.Guid());
            DropForeignKey("dbo.Timetables", "LineId", "dbo.Lines");
            DropForeignKey("dbo.PointPathLines", "LineId", "dbo.Lines");
            DropForeignKey("dbo.Buses", "LineId", "dbo.Lines");
            DropIndex("dbo.Timetables", new[] { "LineId" });
            DropIndex("dbo.PointPathLines", new[] { "LineId" });
            DropIndex("dbo.Buses", new[] { "LineId" });
            AlterColumn("dbo.Timetables", "LineId", c => c.Guid());
            AlterColumn("dbo.SoldTickets", "Type", c => c.String());
            AlterColumn("dbo.ProductTypes", "Name", c => c.String());
            AlterColumn("dbo.PointPathLines", "LineId", c => c.Guid());
            AlterColumn("dbo.Buses", "LineId", c => c.Guid());
            RenameColumn(table: "dbo.Timetables", name: "LineId", newName: "Line_Id");
            RenameColumn(table: "dbo.PointPathLines", name: "LineId", newName: "Line_Id");
            RenameColumn(table: "dbo.Buses", name: "LineId", newName: "Line_Id");
            CreateIndex("dbo.Timetables", "Line_Id");
            CreateIndex("dbo.PointPathLines", "Line_Id");
            CreateIndex("dbo.BusStops", "Line_Id");
            CreateIndex("dbo.BusStops", "BusStop_Id");
            CreateIndex("dbo.Buses", "Line_Id");
            AddForeignKey("dbo.Timetables", "Line_Id", "dbo.Lines", "Id");
            AddForeignKey("dbo.PointPathLines", "Line_Id", "dbo.Lines", "Id");
            AddForeignKey("dbo.Buses", "Line_Id", "dbo.Lines", "Id");
            AddForeignKey("dbo.BusStops", "Line_Id", "dbo.Lines", "Id");
            AddForeignKey("dbo.BusStops", "BusStop_Id", "dbo.BusStops", "Id");
        }
    }
}
