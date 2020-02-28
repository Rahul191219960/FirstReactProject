using Microsoft.Extensions.DependencyInjection;
using NgenV4.Domain;
using NgenV4.Data;
using NgenV4.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NgenV4.Service.Interface;

namespace NgenV4.API
{
    public static class ServiceInjectorWrapperClass
    {
        public static void ConfigureServiceInjector(this IServiceCollection services)
        {
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IFormModelService, FormModelService>();
            services.AddScoped<IAutoCompleteService, AutoCompleteService>();
            services.AddScoped<ISample1Service, Sample1Service>();
            services.AddScoped<ITodoService,TodoService>();
            services.AddScoped<IUserAuthenticationService,UserAuthenticationService>();
            services.AddScoped<IUsersService,UsersService>();
            services.AddScoped<IUserGroupService,UserGroupService>();
            services.AddSingleton<Microsoft.AspNetCore.Http.IHttpContextAccessor, Microsoft.AspNetCore.Http.HttpContextAccessor>();
           // services.AddScoped<ICountryService, CountryService>();
        }

    }
}
