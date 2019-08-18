# MongDB_Analytical_Query_StackExchange
MongoDB simple and analytical queries.

Data set
The data that you will use is the latest dump (publication date: 2018-06-05) of the Artificial Intelligence Stack Exchange question and answer site (https://ai.stackexchange. com/). The dump is released and maintained by stackexchange: https://archive.org/ details/stackexchange. The original dump contains many files in XML format. The assignment uses a subset of the data stored in four tsv files. The data files and the description (readme.txt) can be downloaded from Canvas. The assignment data set contains the following files:
• Posts.tsv stores information about post, each row represents a post, which could be a question or an answer
• Users.tsv stores user’s profile, each row represents a user
• Votes.tsv stores detailed vote information about post, each row represents a vote, including the vote type, the date this vote is made and a few other information
• Tags.tsv contains summary of tag usage in this site.

Simple Queries:
SQ1: Find all users involved in a given question (identified by id) and their respective profiles including the creationDate, DisplayName, upVote and DownVote
SQ2: Assuming each tag represents a topic, find the most viewed question in a given topic.1

Analytical Queries:
AQ1: Find all users involved in a given question (identified by id) and their respective profiles including the creationDate, DisplayName, upVote and DownVote. Note, we are only interested in existing users who either posted or answered the question. You may ignore users that do not have an id.
AQ2" Given a time period as indicated by starting and ending date, find the top 5 topics in that period. We rank a topic by the number of users that has either posted a question in that topic or has answered a question in that topic. This would help us to understand the trending topics in different periods of time. For instance, the trending topics and respective user numbers in August, 2018 as indicated by start date 2018-08-01T00:00:00 and end date 2018-08-31T00:00:00 are:
Topic
neural-networks machine-learning
deep-learning reinforcement-learning convolutional-neural-networks
User Number 65 44 39 28 24
AQ3: Given a topic, find the champion user and all questions the user has answers accepted in that topic. We define a champion user as the one who has the most answers accepted in a given topic. For instance, the champion user of topic ‘deep-learning’ is 4398 and 1847. Both users have 9 answers being accepted in this topic. Your result may show either of the two users. Below is an example of the questions user 4398 has answers accepted:
Id Title
3402 Is there ever a need to combine deep learning ... 
3453 What are the pros and cons of using a spatial ... 
4080 Is it necessary to clear the replay memory reg... 
4085 Policy gradients for multiple continuous actions 
4167 Reinforcement learning for robotic motion plan... 
4346 Is the new Alpha Go implementation using Gener... 
4425 Deep Learning - Classification or Regression A... 
4740 I don’t understand the ”Target Network” in Dee... 
5185 What is the purpose of the GAN
AQ4: Recommend unanswered questions to a given user. Some question may have been posted for a period of time but may not have an accepted answers yet. We refer to such question as unanswered question. We would like to recommend unanswered questions to potential answerers. For any user with n answers accepted in a certain topic with n greater than or equal to a threshold value α, we consider the user a potential answerer of unanswered questions in that topic. For instance, given a user with id 4398, an α value 4 and a cutoff date of question creation as 2018-08-30T00:00:00. We will find user 4398 is a potential answerer in the following topics: reinforcement-learning, deep-learning, machine-learning and ai-design. The user has 10 answers accepted in reinforcement-learning area, 9 in deeplearning area, 5 in machine-learning area and 4 in ai-design area. The most 5 recent unanswered question in those topics that are posted before 2018-08-30T00:00:00 are:
Id Title CreationDate
7755 How to implement a constrained action space in... 2018-08-29 16:04:16.113 
7737 creating application to transform human comput... 2018-08-28 00:17:55.907 
7736 In imitation learning, do you simply inject op... 
7734 AI composing music
7727 How is it possible to teach a neural network t... 
They should be the questions recommended to user 4398.
AQ5: Discover questions with arguable accepted answer. Users can give upVote to both question and answer. Usually the accepted answer of a question receives the highest number of upVote among all answers of this question. In rare case, another answer(s) may receive higher upVote count than the upVote count of the accepted answer. In this query, you are asked to discover such questions whose accepted answer has less upVote count than the upVote count of one of its other answers. Note We are only interested in questions with upVote count greater than a given threshold value α. With high α value, you are likely to get an empty set as the result. A reasonable α value would be between 5-15. Your result should show the question id, the upVote count of its accepted answer, and the highest upVote count received by other answers.
AQ6: Discover the top five coauthors of a given user. Consider all users involved in a question as co-authors, for a given user, we rank the coauthors by the number of questions this user and the coauthor appear together either as originator or answerer. For instance, user 4398 has the following top co-authors: 1671(5), 11571(4), 9161(4), 4302(3) and 6019(3). User 4398 and user 1671 appeared together in five questions; user 4398 and user 1571 appeared together in 4 questions. Your result should include both the user id and the number of questions the pair appeared together (co-authored).

