# Online News Server

This project is a server for a web application which allows users to post and read articles about the topics of their choice and many more features.
You can access to the web application with this [link](https://onlinenewsfront.azurewebsites.net/).

## Use the application

First click on this [link](https://onlinenewsfront.azurewebsites.net/).
Then you should be on the home page of the application. Here you can sign-up or login. Be aware that there is no callback message which tell you if the credentials are wrong or if you have created your account, so I strongly recommand you to use short credentials.

When you are logged in the application you should see lists of article, you can navigate in it, click on like/dislike button and comment it. You can create and post a new article. You can go to your profile and update the informations there. You can also subscribe to other users accounts. You can remove your contents such as comment and article you posted.

If you want to try  without creating account, you can use these credentials : username=tamara, pwd=tamara.
## GraphQL requests

This server use GraphQL to fetch data from the database to the frontend. Here is a list of all the possible requests:

```
registerUser(String! username, String! password) : User
```
  This is the request which allows user to create an account.

```
addUserInfo(String firstName, String lastName, String description, String avatar) : User
```
  This is the request which allows user to add/upload informations to his account.

```
subscribeToUser(ID! id): : User
```
  This is the request which allows user to subscribe to another user account. If user already subscribes to the id it will unsubscribe it.
  
```
 postArticle(String! title, String! text, [ID] topics, String headPicture) : Article
```
This is the request which allows user to post a new article.

```
postComment(ID! articleID, String! text): Article
```
This is the request which allows user to comment an article.

```
removeComment(ID! commentID) : Article
```
This is the request which allows user to remove one of his comments. The request will check if the comment which will be removed has been posted by the same user.

```
like(ID! articleID) : Article
```
This is the request which allows user to like an article. The request will check if the user has already a like or dislike on this article: if the user has already a like, this like will be removed; if the user has a dislike, this dislike will be removed and a like will be added.

```
dislike(ID! articleID) : Article
```
This is the same request as the previous but for dislike article.

```
removeArticle(ID! articleID) : Message
```
This is the request which allows user to remove one of his articles. It returns a confirmation message.

```
addTopic(String! name) : Topic
```
This request can create a new topic for article. It is not implemented on the website yet.

```
singleUpload(Upload! file) : Upload
```
This request allows user to add a new file on the server. This is use to add headPicture for article or images for the article's content or an avatar for user account.


[Product backlog](https://github.com/arnaud18o5/SSSF_Project/projects/1)

[Project prototype](https://www.figma.com/file/6pWUEZgZ1SL6b3UJ9ByP7l/OnlineNewPaper)

[Front-end GitHub](https://github.com/arnaud18o5/OnlineNewsFront)

[Azure server](https://onlinenews.azurewebsites.net/graphql)

[Front end](https://onlinenewsfront.azurewebsites.net/)
