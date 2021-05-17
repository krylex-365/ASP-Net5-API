using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using TMDT.Data;
using Microsoft.Extensions.Logging;
using TMDT.Controllers;
using TMDT.Models;
using System.Linq;
using System.Net.Http;
using ThuongMaiDienTu.Models;
using System.Net;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ECContext context;
        public HomeController(ECContext context)
        {
            this.context = context;
        }
        [HttpPost]
        public User Login(Account account)
        {
            var ac = context.Accounts.ToList().Find(x => x.UserName == account.UserName && x.Password == account.Password);

            if (ac != null)
            {
                var role = context.Roles.Find(ac.RoleId);
                var customer = context.Customers.ToList().FindAll(cus => cus.AccountId == ac.AccountId)[0];

                var claims = new[]
                {
                    new Claim("AccountId", ac.AccountId),
                    new Claim("CustomerId", customer.CustomerId),
                    new Claim("UserName", ac.UserName),
                    new Claim("RoleId", role.RoleId),
                    new Claim(ClaimTypes.Role, role.Name)
                };
                var tokenString = GenerateJSONWebToken(claims);

                HttpContext.Session.SetString("JWToken", tokenString);

                /*if(ac.Quyen == 2)
                {
                    return Redirect("~/NhanVien/Index");
                }
                return Redirect("~/Dashboard/Index");*/

                return new User()
                {
                    Name = ac.UserName,
                    Token = tokenString,
                };
                /*return Ok("Đăng nhập thành công");*/
            }
            return new User()
            {
                Name = "",
                Token = "",
            };
            /*return NotFound("Sai thông tin đăng nhập");*/
        }

        private string GenerateJSONWebToken(Claim[] claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("hft4GJ7YF3Gdseg7dejo4"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [HttpGet]
        public HttpResponseMessage Logout()
        {
            HttpContext.Session.Clear();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}

//Dùng để đăng nhập trên postman
/*{
    "accountId": "a1",
        "userName": "u1",
        "password": "123",
        "avatar": "a.jpg",
        "roleId": "r1",
        "customer": null
    }*/ 