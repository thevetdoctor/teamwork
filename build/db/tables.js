"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var tableQuery = "CREATE TABLE IF NOT EXISTS employees(\n                                                  userId SERIAL PRIMARY KEY,\n                                                  firstName TEXT NOT NULL,  \n                                                  lastName TEXT NOT NULL,\n                                                  email VARCHAR NOT NULL,\n                                                  password VARCHAR(255) NOT NULL,\n                                                  gender TEXT NOT NULL,\n                                                  jobRole TEXT NOT NULL,\n                                                  department TEXT NOT NULL,\n                                                  address VARCHAR(255) NOT NULL,\n                                                  isAdmin BOOLEAN DEFAULT FALSE, \n                                                  createdOn TIME WITH TIME ZONE DEFAULT NOW()\n                                                );\n                    CREATE TABLE IF NOT EXISTS gifs(\n                                                  gifId SERIAL PRIMARY KEY,\n                                                  authorId INT NOT NULL,\n                                                  title TEXT NOT NULL,\n                                                  imageUrl VARCHAR(255) NOT NULL,\n                                                  createdOn TIME WITH TIME ZONE DEFAULT NOW(),\n                                                  lastUpdated TIME WITH TIME ZONE DEFAULT NOW(),\n                                                  flagged BOOLEAN DEFAULT false,\n                                                  liked INT DEFAULT 0,\n                                                  foreign key(authorId) references employees(userId)\n                                                );\n                    CREATE TABLE IF NOT EXISTS articles(\n                                                  articleId SERIAL PRIMARY KEY,\n                                                  authorId INT NOT NULL,\n                                                  title TEXT NOT NULL,\n                                                  article TEXT NOT NULL,\n                                                  createdOn TIME WITH TIME ZONE DEFAULT NOW(),\n                                                  lastUpdated TIME WITH TIME ZONE DEFAULT NOW(),\n                                                  flagged BOOLEAN DEFAULT false,\n                                                  liked INT DEFAULT 0,\n                                                  foreign key(authorId) references employees(userId)\n                                                );\n                    CREATE TABLE IF NOT EXISTS comments(\n                                                  commentId SERIAL PRIMARY KEY,\n                                                  authorId INT NOT NULL,\n                                                  gifarticleId INT NOT NULL,\n                                                  comment TEXT NOT NULL,\n                                                  type TEXT DEFAULT 'article',\n                                                  createdOn TIME WITH TIME ZONE DEFAULT NOW(),\n                                                  flagged BOOLEAN DEFAULT false,\n                                                  liked INT DEFAULT 0,\n                                                  foreign key(authorId) references employees(userId),\n                                                  foreign key(gifarticleId) references gifs(gifId),\n                                                  foreign key(gifarticleId) references articles(articleId)\n                                                );";
var _default = tableQuery;
exports["default"] = _default;