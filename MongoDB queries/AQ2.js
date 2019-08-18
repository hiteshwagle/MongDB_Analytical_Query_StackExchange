DBQuery.shellBatchSize = 10000;
db.Posts.aggregate
([
    {
        $project:
        {
            _id:0,
            Id:1,
            Title:1,
            OwnerUserId:1,
            CreationDate:1,
            AnswerCount:1,
            Tag1 : {$split: ["$Tags", ","] }
        }
    },
    {
            $unwind:"$Tag1"
    },
    {
        $project:
        {
            _id:0,
            Id:1,
            Title:1,
            OwnerUserId:1,
            CreationDate:1,
            AnswerCount:1,
            Tag : {$split: ["$Tag1", '"'] }
        }
    },
    {
        $unwind:"$Tag"
    },
    {
        $match:{Tag: {$ne:""}
        }
    },
    {$sort:{Id:1}
    },
    {
        $lookup:
        {
            from:"Posts",
            localField: "Id",
            foreignField: "ParentId",
            as: "Users_Linked"
        }
    },
    {
        $unwind:"$Users_Linked" 
    },
    {
        $match:{"Users_Linked.CreationDate": {$gte:("2018-08-01T00:00:00Z"),$lte:("2018-08-31T00:00:00Z")}}
    },
    {
        $sort:
        {
        Tag:1
        }
    },{
        $group:
        {
            _id: {Tags:"$Tag", Ids: ["$Id", "$Users_Linked.Id"]}
        }
    },
    {
        $unwind:"$_id.Ids"
    },
    {
        $group:
        {
            _id: {Tag1: "$_id.Tags", post: "$_id.Ids"}
        }
    },
    {
        $unwind:"$_id"
    },
    {
        $lookup:
        {
            from: "Posts",
            localField: "_id.post",
            foreignField: "Id",
            as: "Users_Info"
        }
    },
    {
        $project:
        {
            Tag: "$_id.Tag1",
            OwnerId: "$Users_Info.OwnerUserId" 
        }
    },
    {
        $group:
        {
            _id : "$Tag",
            Count:{$addToSet: "$OwnerId"}
        }
    },
    {
        $unwind: "$Count"
    },
    {
        $group:
        {
            _id: "$_id",
            Count:{$sum:1}
        }
    },
    {
        $project:
        {
            _id:0,
            Topic:"$_id",
            User_Number: "$Count" 
        }
    },
    {
        $sort:
        {
            User_Number:-1
        }
    },
    {
        $limit:5
    }                                               
])
