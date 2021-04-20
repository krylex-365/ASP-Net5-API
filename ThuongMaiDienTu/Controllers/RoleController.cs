using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using TMDT.Data;
using TMDT.Models;

namespace TMDT.Controllers
{
    [Authorize(Roles = "admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly ECContext context;
        public RoleController(ECContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public List<Role> GetList()
        {
            return context.Roles.ToList();
        }
        [HttpGet("{id}")]
        public Role GetById(string id)
        {
            return context.Roles.Find(id);
        }
        [HttpPost]
        public HttpResponseMessage Add(Role role)
        {
            Role role1 = context.Roles.Find(role.RoleId);
            if (role1 != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return Problem("Duplicate primary key", null, 400, "Role", "Add");
                /*return "Duplicate primary key";*/
            }

            context.Roles.Add(role);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return Ok("Added");
            /*return "Added";*/
        }
        [HttpPut]
        public HttpResponseMessage Update(Role role)
        {
            Role role1 = context.Roles.Find(role.RoleId);
            if (role1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Update not found";
            }

            context.Entry(role1).State = EntityState.Detached;
            context.Entry(role).State = EntityState.Modified;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Updated";
        }
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Role role1 = context.Roles.Find(id);
            if(role1 == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete not found";
            }
            Account account = context.Accounts.ToList().Find(x => x.RoleId == id);
            if (account != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
                //return "Delete foreign key first";
            }
            context.Entry(role1).State = EntityState.Deleted;
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
            //return "Deleted";
        }
    }
}
