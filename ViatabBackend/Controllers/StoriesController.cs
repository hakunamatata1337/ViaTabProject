using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class StoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public StoriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_context.Stories.ToList());

    [HttpPost]
    public IActionResult Create(Story story)
    {
        _context.Stories.Add(story);
        _context.SaveChanges();
        return Ok(story);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Story updated)
    {
        var story = _context.Stories.Find(id);
        if (story == null) return NotFound();

        story.Title = updated.Title;
        story.Department = updated.Department;
        story.Content = updated.Content;
        _context.SaveChanges();
        return Ok(story);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var story = _context.Stories.Find(id);
        if (story == null) return NotFound();

        _context.Stories.Remove(story);
        _context.SaveChanges();
        return Ok();
    }
}