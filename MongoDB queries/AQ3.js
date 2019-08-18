DBQuery.shellBatchSize = 100;
db.Posts.aggregate
([
    {
        $lookup:
        {
            from: "Posts",
            localField:"AcceptedAnswerId",
            foreignField:"Id",
            as : "allques"
        }
    },
    {
        $unwind:"$allques"
    },
    {
        $project:
        {
            Id:1,
            AcceptedAnswerId:1,
            OwnerUserId:1,
            Title:1,
            Tag : {$split: ["$Tags", ","]},
            nacceptedanswerid: "$allques.Id",
            nownerid: "$allques.OwnerUserId" 
        }
    },
    {
            $unwind:"$Tag"
    },
        {
        $project:
        {
            Id:1,
            AcceptedAnswerId:1,
            OwnerUserId:1,
            Title:1,
            Tag1 : {$split: ["$Tag", '"']},
            nacceptedanswerid: 1,
            nownerid: 1 
        }
    },
    {
            $unwind:"$Tag1"
    },
    {
        $match:{Tag1: {$ne:""}}
    },
    {
        $group:
        {
            _id: { tag: "$Tag1", oid: "$nownerid"}, 
            titles :{$addToSet:{$concat:[{ $convert: { input: "$Id", to: "string" } }," - ","$Title"]}},
            count: {$sum:1}
        }
    },
    {
        $project:
        {
            _id:0,
            OwnerId:"$_id.oid",
            Tags:"$_id.tag",
            Title:"$titles",
            Count:"$count"
        }
    },
    {
        $sort:
        {
            Tags:1,
            Count:-1
        }
    },
    {
        $match:
        {
            Tags:"deep-learning"
        }
    },
    {
        $limit:1
    },
    {
        $unwind: "$Title"
    },
    {
        $project:
        {
            _id:0,
            OwnerId:1,
            Tags:1,
            Title:1
        }
    }
])
