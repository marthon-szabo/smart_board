﻿// <auto-generated />
using System;
using App.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace App.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20210420075652_SeedUpTasks")]
    partial class SeedUpTasks
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.4");

            modelBuilder.Entity("App.Models.Entities.Board", b =>
                {
                    b.Property<string>("BoardId")
                        .HasColumnType("TEXT")
                        .HasColumnName("board_id");

                    b.Property<string>("BoardName")
                        .HasColumnType("TEXT")
                        .HasColumnName("board_name");

                    b.HasKey("BoardId");

                    b.ToTable("Boards");

                    b.HasData(
                        new
                        {
                            BoardId = "myBoard",
                            BoardName = "My board"
                        });
                });

            modelBuilder.Entity("App.Models.Entities.Column", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("column_id");

                    b.Property<string>("BoardId")
                        .HasColumnType("TEXT")
                        .HasColumnName("board_id");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT")
                        .HasColumnName("column_name");

                    b.HasKey("Id");

                    b.ToTable("Columns");

                    b.HasData(
                        new
                        {
                            Id = "myColumn",
                            BoardId = "myBoard",
                            Name = "My Column"
                        });
                });

            modelBuilder.Entity("App.Models.Entities.Task", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("task_id");

                    b.Property<string>("ColumnId")
                        .HasColumnType("TEXT")
                        .HasColumnName("column_id");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("TEXT")
                        .HasColumnName("deadline");

                    b.Property<DateTime>("Description")
                        .HasColumnType("TEXT")
                        .HasColumnName("task_description");

                    b.Property<bool>("IsDone")
                        .HasColumnType("INTEGER")
                        .HasColumnName("is_done");

                    b.Property<DateTime>("SubtaskId")
                        .HasColumnType("TEXT")
                        .HasColumnName("subtask_id");

                    b.Property<string>("TaskName")
                        .HasColumnType("TEXT")
                        .HasColumnName("task_name");

                    b.HasKey("Id");

                    b.ToTable("Tasks");

                    b.HasData(
                        new
                        {
                            Id = "myTaks",
                            ColumnId = "myColumn",
                            Deadline = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsDone = false,
                            SubtaskId = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            TaskName = "My Task1"
                        },
                        new
                        {
                            Id = "myTaks2",
                            ColumnId = "myColumn",
                            Deadline = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Description = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            IsDone = false,
                            SubtaskId = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            TaskName = "My Task2"
                        });
                });

            modelBuilder.Entity("App.Models.Entities.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.Property<string>("Badges")
                        .HasColumnType("char")
                        .HasColumnName("badges");

                    b.Property<string>("DoneQuests")
                        .HasColumnType("char")
                        .HasColumnName("done_quests");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("char(250)")
                        .HasColumnName("email");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("char(250)")
                        .HasColumnName("password");

                    b.Property<string>("TakenQuests")
                        .HasColumnType("char")
                        .HasColumnName("taken_quests");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("char(50)")
                        .HasColumnName("username");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = "First",
                            Email = "stub@stub.com",
                            Password = "12345",
                            UserName = "Márton Szabó"
                        });
                });

            modelBuilder.Entity("App.Models.Entities.UsersBoards", b =>
                {
                    b.Property<string>("UsersBoardsId")
                        .HasColumnType("TEXT")
                        .HasColumnName("users_boards_id");

                    b.Property<string>("BoardId")
                        .HasColumnType("TEXT")
                        .HasColumnName("board_id");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.HasKey("UsersBoardsId");

                    b.ToTable("users_boards");
                });
#pragma warning restore 612, 618
        }
    }
}