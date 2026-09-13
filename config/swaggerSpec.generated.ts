const swaggerSpec = {
  "openapi": "3.0.0",
  "info": {
    "title": "Job Board API",
    "version": "1.0.0",
    "description": "REST API for job seekers and employers"
  },
  "servers": [
    {
      "url": "/"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "paths": {
    "/api/profiles/me": {
      "get": {
        "summary": "Get current user's profile",
        "tags": [
          "Profiles"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Profile returned successfully"
          },
          "401": {
            "description": "Authentication required"
          }
        }
      }
    },
    "/api/profiles/seeker/me": {
      "put": {
        "summary": "Create or update seeker profile",
        "tags": [
          "Profiles"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "skills"
                ],
                "properties": {
                  "bio": {
                    "type": "string"
                  },
                  "skills": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Seeker profile saved successfully"
          },
          "400": {
            "description": "Validation error"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Job seekers only"
          }
        }
      }
    },
    "/api/profiles/employer/me": {
      "put": {
        "summary": "Create or update employer profile",
        "tags": [
          "Profiles"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "companyName"
                ],
                "properties": {
                  "companyName": {
                    "type": "string"
                  },
                  "companyWebsite": {
                    "type": "string",
                    "format": "uri"
                  },
                  "companyDescription": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Employer profile saved successfully"
          },
          "400": {
            "description": "Validation error"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Employers only"
          }
        }
      }
    },
    "/api/profiles/seeker/cv": {
      "patch": {
        "summary": "Upload seeker CV",
        "tags": [
          "Profiles"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "required": [
                  "cv"
                ],
                "properties": {
                  "cv": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "CV uploaded successfully"
          },
          "400": {
            "description": "CV is required or invalid file type"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Job seekers only"
          },
          "404": {
            "description": "Seeker profile not found"
          }
        }
      }
    },
    "/api/jobs": {
      "get": {
        "summary": "Get all jobs",
        "tags": [
          "Jobs"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "page",
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "query",
            "name": "limit",
            "schema": {
              "type": "integer"
            }
          },
          {
            "in": "query",
            "name": "search",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "employerId",
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Jobs returned successfully"
          }
        }
      },
      "post": {
        "summary": "Create a new job",
        "tags": [
          "Jobs"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "title",
                  "description"
                ],
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Job created successfully"
          },
          "400": {
            "description": "Validation error"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Employers only"
          }
        }
      }
    },
    "/api/jobs/{id}": {
      "get": {
        "summary": "Get job by id",
        "tags": [
          "Jobs"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Job returned successfully"
          },
          "400": {
            "description": "Invalid job id"
          },
          "404": {
            "description": "Job not found"
          }
        }
      },
      "patch": {
        "summary": "Update a job",
        "tags": [
          "Jobs"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Job updated successfully"
          },
          "400": {
            "description": "Invalid data or job id"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Not allowed to update this job"
          },
          "404": {
            "description": "Job not found"
          }
        }
      },
      "delete": {
        "summary": "Delete a job",
        "tags": [
          "Jobs"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Job deleted successfully"
          },
          "400": {
            "description": "Invalid job id"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Not allowed to delete this job"
          },
          "404": {
            "description": "Job not found"
          }
        }
      }
    },
    "/api/jobs/{id}/apply": {
      "post": {
        "summary": "Apply to a job",
        "tags": [
          "Applications"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Application submitted successfully"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Job seekers only"
          },
          "404": {
            "description": "Job not found"
          },
          "409": {
            "description": "Already applied to this job"
          }
        }
      }
    },
    "/api/jobs/{id}/applications": {
      "get": {
        "summary": "Get applications for a job",
        "tags": [
          "Applications"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Applications returned successfully"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Not allowed to view these applications"
          },
          "404": {
            "description": "Job not found"
          }
        }
      }
    },
    "/api/auth/register": {
      "post": {
        "summary": "Register a new user",
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "email",
                  "password",
                  "role"
                ],
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "password": {
                    "type": "string"
                  },
                  "role": {
                    "type": "string",
                    "enum": [
                      "SEEKER",
                      "EMPLOYER"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User registered successfully"
          },
          "400": {
            "description": "Validation error"
          },
          "409": {
            "description": "Email already exists"
          }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "summary": "Login user",
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "email",
                  "password"
                ],
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Login successful"
          },
          "400": {
            "description": "Validation error"
          },
          "401": {
            "description": "Invalid email or password"
          }
        }
      }
    },
    "/api/auth/me": {
      "get": {
        "summary": "Get current user",
        "tags": [
          "Auth"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Current user data"
          },
          "401": {
            "description": "Invalid or missing token"
          }
        }
      }
    },
    "/api/applications/me": {
      "get": {
        "summary": "Get current seeker's applications",
        "tags": [
          "Applications"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Applications returned successfully"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Job seekers only"
          }
        }
      }
    },
    "/api/applications/{id}/status": {
      "patch": {
        "summary": "Update application status",
        "tags": [
          "Applications"
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "status"
                ],
                "properties": {
                  "status": {
                    "type": "string",
                    "enum": [
                      "ACCEPTED",
                      "REJECTED"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Application status updated successfully"
          },
          "400": {
            "description": "Invalid application id or status"
          },
          "401": {
            "description": "Authentication required"
          },
          "403": {
            "description": "Not allowed to update this application"
          },
          "404": {
            "description": "Application not found"
          }
        }
      }
    }
  },
  "tags": []
};

export default swaggerSpec;
