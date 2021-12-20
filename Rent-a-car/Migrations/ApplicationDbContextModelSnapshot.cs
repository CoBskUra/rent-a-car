﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Rent_a_Car.Data;

namespace Rent_a_Car.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Rent_a_Car.Models.Car", b =>
                {
                    b.Property<int>("CarID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Brand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HorsePower")
                        .HasColumnType("int");

                    b.Property<string>("Model")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CarID");

                    b.ToTable("Car");
                });

            modelBuilder.Entity("Rent_a_Car.Models.CarDetails", b =>
                {
                    b.Property<int>("CarDetailsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CarID")
                        .HasColumnType("int");

                    b.Property<int>("CompanyID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("bit");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,4)");

                    b.Property<DateTime>("YearOfProduction")
                        .HasColumnType("datetime2");

                    b.HasKey("CarDetailsID");

                    b.HasIndex("CarID");

                    b.HasIndex("CompanyID");

                    b.ToTable("CarDetails");
                });

            modelBuilder.Entity("Rent_a_Car.Models.Company", b =>
                {
                    b.Property<int>("CompanyID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Phone")
                        .HasColumnType("int");

                    b.HasKey("CompanyID");

                    b.ToTable("Company");
                });

            modelBuilder.Entity("Rent_a_Car.Models.Customer", b =>
                {
                    b.Property<int>("CustomerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("BecoamingDriverDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("BirtheDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfOverallRentedCar")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfRentedCar")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Poste_Code")
                        .HasColumnType("decimal(18,4)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CustomerID");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("Rent_a_Car.Models.Employer", b =>
                {
                    b.Property<int>("EmployerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmployerID");

                    b.ToTable("Employer");
                });

            modelBuilder.Entity("Rent_a_Car.Models.RentCarEvent", b =>
                {
                    b.Property<string>("RentCarEventID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("CarDetailsID")
                        .HasColumnType("int");

                    b.Property<int>("CustomerID")
                        .HasColumnType("int");

                    b.Property<bool>("IsReturned")
                        .HasColumnType("bit");

                    b.Property<DateTime>("MaximumReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ReturnFileID")
                        .HasColumnType("int");

                    b.Property<DateTime>("SubmitDate")
                        .HasColumnType("datetime2");

                    b.HasKey("RentCarEventID");

                    b.HasIndex("CarDetailsID");

                    b.HasIndex("CustomerID");

                    b.HasIndex("ReturnFileID");

                    b.ToTable("RentCar");
                });

            modelBuilder.Entity("Rent_a_Car.Models.ReturnFile", b =>
                {
                    b.Property<int>("ReturnFileID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CarConditon")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("EmployerID")
                        .HasColumnType("int");

                    b.Property<int>("OdometerReading")
                        .HasColumnType("int");

                    b.Property<byte[]>("Photo")
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("RentedCarID")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<byte[]>("ReturnProocol")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("ReturnFileID");

                    b.HasIndex("EmployerID");

                    b.ToTable("ReturnFile");
                });

            modelBuilder.Entity("Rent_a_Car.Models.CarDetails", b =>
                {
                    b.HasOne("Rent_a_Car.Models.Car", "Car")
                        .WithMany("CarDetails")
                        .HasForeignKey("CarID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Rent_a_Car.Models.Company", "Company")
                        .WithMany("CarDetails")
                        .HasForeignKey("CompanyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");

                    b.Navigation("Company");
                });

            modelBuilder.Entity("Rent_a_Car.Models.RentCarEvent", b =>
                {
                    b.HasOne("Rent_a_Car.Models.CarDetails", "CarDetails")
                        .WithMany("RentCars")
                        .HasForeignKey("CarDetailsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Rent_a_Car.Models.Customer", "Customer")
                        .WithMany("RentCars")
                        .HasForeignKey("CustomerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Rent_a_Car.Models.ReturnFile", "ReturnFile")
                        .WithMany()
                        .HasForeignKey("ReturnFileID");

                    b.Navigation("CarDetails");

                    b.Navigation("Customer");

                    b.Navigation("ReturnFile");
                });

            modelBuilder.Entity("Rent_a_Car.Models.ReturnFile", b =>
                {
                    b.HasOne("Rent_a_Car.Models.Employer", "Employer")
                        .WithMany("ReturnFiles")
                        .HasForeignKey("EmployerID");

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("Rent_a_Car.Models.Car", b =>
                {
                    b.Navigation("CarDetails");
                });

            modelBuilder.Entity("Rent_a_Car.Models.CarDetails", b =>
                {
                    b.Navigation("RentCars");
                });

            modelBuilder.Entity("Rent_a_Car.Models.Company", b =>
                {
                    b.Navigation("CarDetails");
                });

            modelBuilder.Entity("Rent_a_Car.Models.Customer", b =>
                {
                    b.Navigation("RentCars");
                });

            modelBuilder.Entity("Rent_a_Car.Models.Employer", b =>
                {
                    b.Navigation("ReturnFiles");
                });
#pragma warning restore 612, 618
        }
    }
}
