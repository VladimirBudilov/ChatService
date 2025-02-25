using Domain.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace ChatApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessagesController(AppDbContext context) : ODataController
{
	[HttpGet]
	[EnableQuery]
	public IQueryable<Message> Get()
	{
		return context.Messages;
	}
}