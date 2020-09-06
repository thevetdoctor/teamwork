const tableQuery = `CREATE TABLE IF NOT EXISTS employees(
                                                  userId SERIAL PRIMARY KEY,
                                                  firstName TEXT NOT NULL,  
                                                  lastName TEXT NOT NULL,
                                                  email VARCHAR NOT NULL,
                                                  password VARCHAR(255) NOT NULL,
                                                  gender TEXT NOT NULL,
                                                  jobRole TEXT NOT NULL,
                                                  department TEXT NOT NULL,
                                                  address VARCHAR(255) NOT NULL,
                                                  isAdmin BOOLEAN DEFAULT false, 
                                                  createdOn TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                                                );
                    CREATE TABLE IF NOT EXISTS gifs(
                                                  gifId SERIAL PRIMARY KEY,
                                                  authorId INT NOT NULL,
                                                  title TEXT NOT NULL,
                                                  imageUrl VARCHAR(255) NOT NULL,
                                                  createdOn TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                                                  lastUpdated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                                                  flagged BOOLEAN DEFAULT false,
                                                  liked INT DEFAULT 0,
                                                  commentCount INT DEFAULT 0,
                                                  type TEXT NOT NULL DEFAULT 'gif',
                                                  foreign key(authorId) references employees(userId)
                                                );
                    CREATE TABLE IF NOT EXISTS articles(
                                                  articleId SERIAL PRIMARY KEY,
                                                  authorId INT NOT NULL,
                                                  title TEXT NOT NULL,
                                                  article TEXT NOT NULL,
                                                  createdOn TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                                                  lastUpdated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                                                  flagged BOOLEAN DEFAULT false,
                                                  liked INT DEFAULT 0,
                                                  commentCount INT DEFAULT 0,
                                                  type TEXT NOT NULL DEFAULT 'article',
                                                  foreign key(authorId) references employees(userId)
                                                );
                    CREATE TABLE IF NOT EXISTS comments(
                                                  commentId SERIAL PRIMARY KEY,
                                                  authorId INT NOT NULL,
                                                  gifarticleId INT NOT NULL,
                                                  comment TEXT NOT NULL,
                                                  type TEXT DEFAULT 'article',
                                                  createdOn TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                                                  flagged BOOLEAN DEFAULT false,
                                                  liked INT DEFAULT 0,
                                                  foreign key(authorId) references employees(userId)
                                                );`;


export default tableQuery;

// foreign key(gifarticleId) references gifs(gifId),
// foreign key(gifarticleId) references articles(articleId)
