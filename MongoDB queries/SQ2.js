DBQuery.shellBatchSize = 500;
db.Posts.aggregate
([
    {
        $project:
        {
            Id:1,
            Title: 1,
            ViewCount:1,
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
        $sort:
        {
            Tag:-1,
            ViewCount:-1
        }
    },
    {
        $group:
        {
            _id: {tag: "$Tag"},
            "tag": {"$first": "$Tag"},
            "title":{"$first": "$Title"},
            "viewcount":{"$first": "$ViewCount"}
        } 
    },
    {
        $project:
        {
            _id:0,
            Tags:"$tag",
            Title:"$title",
            ViewCount:"$viewcount"
        }
    },
    {
        $sort:
        {
            tag:1
        }
    }     
])
