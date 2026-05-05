public class StoryTests
{
    [Fact]
    public void Story_DefaultId_IsZero()
    {
        var story = new Story();
        Assert.Equal(0, story.Id);
    }

    [Fact]
    public void Story_Properties_AreAssignable()
    {
        var story = new Story
        {
            Title = "Fire Drill Gone Wrong",
            Department = "IT",
            Content = "The IT department accidentally triggered the fire alarm."
        };

        Assert.Equal("Fire Drill Gone Wrong", story.Title);
        Assert.Equal("IT", story.Department);
        Assert.Equal("The IT department accidentally triggered the fire alarm.", story.Content);
    }

    [Fact]
    public void Story_Title_CanBeUpdated()
    {
        var story = new Story { Title = "Old Title", Department = "Business", Content = "Old content" };
        story.Title = "New Headline";
        Assert.Equal("New Headline", story.Title);
    }
}
