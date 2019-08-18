DBQuery.shellBatchSize = 500;
db.Posts.aggregate
([
    {
        $match:
        {
            Id:{ $eq: 15 } 
        }
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
        $match:{"Users_Linked.OwnerUserId":{$ne:""}}
    },
    {
        
        $lookup:
        {
            from:"Users",
            localField: "Users_Linked.OwnerUserId",
            foreignField: "Id",
            as: "Users_Info"
        }
    },
    {
        $unwind: "$Users_Info"
    },
    {
        $group:
        {
            _id:{Title: "$Title", ids: ["$OwnerUserId", "$Users_Linked.OwnerUserId"]}
        }
    },
    {
        $unwind: "$_id.ids"
    },
    {
        $lookup:
        {
            from:"Users",
            localField: "_id.ids",
            foreignField: "Id",
            as: "Users_Info"
        }
    },
    {
        $unwind: "$Users_Info"
    },
    {
        $group: 
        {
            _id: "$_id.Title",
            Ids: {$addToSet: "$Users_Info.Id"}
        }
    },
    {
        $unwind:  "$Ids"
    },
    {
        $lookup:
        {
            from:"Users",
            localField: "Ids",
            foreignField: "Id",
            as: "Users_Info"
        }
    },
    {
        $unwind: "$Users_Info"
    },
    {
        $project:
        {
            _id:0,
            Title: "$_id",
            DisplayName: "$Users_Info.DisplayName",
            CreationDate: "$Users_Info.CreationDate",
            UpVotes: "$Users_Info.UpVotes",
            DownVotes: "$Users_Info.DownVotes"
        }
    }
])
