using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using App.Controllers;
using App.Services.Repositories;
using App.Services.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NSubstitute;

namespace Tests
{
    public abstract class ControllerTestBase<TController, TRepo, TEntity> : SQLRepositoryTestsBase<TRepo, TEntity>
        where TController : Controller
        where TRepo : IGeneralRepository<TEntity>
    {
        protected TController _controller;

        public ControllerTestBase(IDictionary<string, string[]>? seedValues = null)
            : base(seedValues)
        {
        }

        private HttpContext CreateHttpContext<T>(T content)
        {
            HttpContext stubHttpContext = Substitute.For<HttpContext>();
            StubHttpSession stubSession = new StubHttpSession();
            
            stubSession["sessionId"] = "test";
            stubHttpContext.Session.Returns(stubSession);

            var stream = new MemoryStream(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(content)));

            stubHttpContext.Request.Body.Returns(stream);
            stubHttpContext.Request.ContentLength.Returns(stream.Length);

            return stubHttpContext;
        }

        protected void CreatePostRequest<T>(T entity)
        {
            var controllerContext = new ControllerContext()
            {
                HttpContext = this.CreateHttpContext<T>(entity)
            };

            _controller.ControllerContext = controllerContext;
        }
    }
}