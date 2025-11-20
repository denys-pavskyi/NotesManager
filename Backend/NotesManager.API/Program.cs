using FluentValidation;
using Microsoft.EntityFrameworkCore;
using NotesManager.API.Models;
using NotesManager.API.Others;
using NotesManager.BLL.Others;
using NotesManager.BLL.Services;
using NotesManager.BLL.Services.Interfaces;
using NotesManager.BLL.Validators;
using NotesManager.DAL.Persistence;
using NotesManager.DAL.Repositories.Interfaces;
using NotesManager.DAL.Repositories.Realizations;

namespace NotesManager.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<NotesManagerDbContext>(options =>
                options.UseSqlServer(builder.Configuration["ConnectionStrings:MsSqlServer"]));

            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MapperProfile>();
            }, AppDomain.CurrentDomain.GetAssemblies());


            // Repository
            builder.Services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
            builder.Services.AddValidatorsFromAssemblyContaining<NoteDtoValidator>();

            var corsConfig = builder.Configuration.GetSection("CORS").Get<CorsConfiguration>();
            builder.Services.AddCors(opt =>
            {
                opt.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(corsConfig.AllowedOrigins)
                        .WithHeaders(corsConfig.AllowedHeaders)
                        .WithMethods(corsConfig.AllowedMethods);
                });
            });

            // Services
            builder.Services.AddScoped<INoteService, NoteService>();

            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }
            else
            {
                app.UseHsts();
            }

            app.UseMiddleware<ErrorHandlerMiddleware>();
            app.UseCors();


            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
