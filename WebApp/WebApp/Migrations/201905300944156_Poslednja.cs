namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Poslednja : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.SoldTickets", "UserId", "dbo.Users");
            DropIndex("dbo.SoldTickets", new[] { "UserId" });
            AddColumn("dbo.SoldTickets", "User_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.AspNetUsers", "Status", c => c.String());
            AddColumn("dbo.AspNetUsers", "Type", c => c.String());
            AddColumn("dbo.AspNetUsers", "Password", c => c.String());
            AddColumn("dbo.AspNetUsers", "Name", c => c.String());
            AddColumn("dbo.AspNetUsers", "Surname", c => c.String());
            AddColumn("dbo.AspNetUsers", "DateOfBirth", c => c.DateTime(nullable: false));
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "HasDocument", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "Files", c => c.String());
            CreateIndex("dbo.SoldTickets", "User_Id");
            AddForeignKey("dbo.SoldTickets", "User_Id", "dbo.AspNetUsers", "Id");
            DropTable("dbo.Users");
        }
        
        public override void Down()
        {
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
            
            DropForeignKey("dbo.SoldTickets", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.SoldTickets", new[] { "User_Id" });
            DropColumn("dbo.AspNetUsers", "Files");
            DropColumn("dbo.AspNetUsers", "HasDocument");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "DateOfBirth");
            DropColumn("dbo.AspNetUsers", "Surname");
            DropColumn("dbo.AspNetUsers", "Name");
            DropColumn("dbo.AspNetUsers", "Password");
            DropColumn("dbo.AspNetUsers", "Type");
            DropColumn("dbo.AspNetUsers", "Status");
            DropColumn("dbo.SoldTickets", "User_Id");
            CreateIndex("dbo.SoldTickets", "UserId");
            AddForeignKey("dbo.SoldTickets", "UserId", "dbo.Users", "Id", cascadeDelete: true);
        }
    }
}
