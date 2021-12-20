using Microsoft.EntityFrameworkCore.Migrations;

namespace Rent_a_Car.Migrations
{
    public partial class migracja : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RentCarID",
                table: "RentCar",
                newName: "RentCarEventID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RentCarEventID",
                table: "RentCar",
                newName: "RentCarID");
        }
    }
}
