DBQuery.shellBatchSize = 10000;
db.Posts.aggregate
([
    {
        $project:
        {
            Id:1,
            Title: 1,
            ViewCount:1,
            date: {$dateFromString: { dateString: '$CreationDate'}},
            Tag1 : {$split: ["$Tags", ","] }
        }
    },
    {
        $unwind:"$Tag1"
    },
    {
        $project:
        {
            Id:1,
            Title: 1,
            ViewCount:1,
            date:1,
            Tag : {$split: ["$Tag1", '"'] }
        } 
    },
    {
        $unwind:"$Tag"
    },
    {
        $match:
        {
            Tag: {$ne:""}
        }
    },
    {
        $lookup:
        {
            from:"Posts",
            let : {ansusers: "$Id"},
            pipeline: [
            {$match: {$expr: {$eq: ['$ParentId', '$$ansusers']}}}
            ],
            as: "Users_Linked"
        }
    },
    {
        $unwind: "$Users_Linked" 
    },
    {
        $match:
        {
            Tag: {$in:["academia","svm", "deep-learning", "ai-basics","google"]}
        }
    },
    {
        $project:
        {
            Id:1,
            Title:1,
            date:1,
            Tag:1,
            ansdate: {$dateFromString: { dateString: "$Users_Linked.CreationDate"}},
            CreationDate:1,
            AnswerediD: "$Users_Linked.Id"
        }
    },
    {
        $project:
        {
            Id:1,
            Title:1,
            Tag:1,
            timediff: {$subtract :["$ansdate", "$date"]}
        }
    },
    {
        $sort:
        {
            Tag:1,
            timediff:1
        }
    },
    {
        $group:
        {
            _id: {tag: "$Tag"},
            "tag": {"$first": "$Tag"},
            "title":{"$first": "$Title"}
        } 
    },
    {
        $project:
        {
            _id:0,
            Tags : "$tag",
            Title : "$title"
        }
    }               
])
