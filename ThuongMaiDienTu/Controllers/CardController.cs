using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using ThuongMaiDienTu.Models;
using TMDT.Data;
using TMDT.Models;

namespace ThuongMaiDienTu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ECContext context;
        public CardController(ECContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public List<Card> GetListByCusTomerId(string id)
        {
            List<Card> cards = context.Cards.ToList().FindAll(card => card.CustomerId == id);
            return cards;
        }

        [HttpPost]
        public HttpResponseMessage Add(Card card)
        {
            Card card1 = context.Cards.ToList().Find(car => car.CustomerId == card.CustomerId && car.ProductId == card.ProductId);
            if (card1 != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            Customer customer = context.Customers.Find(card.CustomerId);
            if (customer == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            Product product = context.Products.Find(card.ProductId);
            if (product == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            //Tu dong tao khoa chinh
            List<Card> cards = context.Cards.ToList();
            string key = "0";
            foreach (Card card2 in cards)
            {
                if (int.Parse(card2.CardId) > int.Parse(key))
                {
                    key = card2.CardId;
                }
            }
            key = "" + (int.Parse(key) + 1);
            card.CardId = key;

            context.Cards.Add(card);
            context.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(string id)
        {
            Card card = context.Cards.Find(id);
            if (card == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            context.Entry(card).State = EntityState.Deleted;
            context.SaveChanges();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
