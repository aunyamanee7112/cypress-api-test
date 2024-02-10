describe('template spec', () => {
  beforeEach("login to application", () => {
    cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/tags", { fixture: 'tags.json' }) // alias
    cy.loginToPage()
  })

  it('verify create Article req and res correctly', () => {
    const title = "title1"
    cy.intercept("POST", "https://conduit-api.bondaracademy.com/api/articles/").as("postArticle") // alias

    cy.contains("New Article").click()
    cy.get('[formcontrolname="title"]').type(title)
    cy.get('[formcontrolname="description"]').type("desp")
    cy.get('[formcontrolname="body"]').type("artificle")
    cy.get('[placeholder="Enter tags"]').type("write2")
    cy.contains("Publish Article").click()


    /** wait responde */
    cy.wait("@postArticle").then(xhr => {
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.article.title).to.equal(title)
    })

  })

  /** mockup API with fixture */
  it('verify popular tags appear', () => {
    cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/articles/feed*", { "article": [], "articleCount": 0 }).as("Global Feed")
    cy.intercept("GET", "https://conduit-api.bondaracademy.com/api/articles*", { fixture: 'articles.json' }).as("Your Feed")
  })

  /** my exercise */
  it("", () => {
    // test and click favorit by mockup
    // static Json Body Response
    cy.fixture("articles").then(item => {
      const article = item.articles[0]
      cy.intercept("POST", `https://conduit-api.bondaracademy.com/api/articles/${article.slug}/favorite`, item)
    }).as("Favorite")
    cy.get('app-favorite-button button').first().click().should().contains("11")

  })

  /** Intercepter Indetail - incepting and modifying */
  it("incepting and modifying", () => {
    const title = "incepting-modifying1991"
    // modify req
    // cy.intercept("POST", "**/articles",(req)=>{
    //   req.body.article.description = "This is Apunn"
    // }).as("postArticleModify") 
    
    cy.intercept("POST", "**/articles",(req) => {
      req.reply(res => {
        expect(res.body.article.description).to.equal("desp")
        res.body.articles.description = "Test a rai"
        console.log("res",res);
        const dump = {}
      })
    }).as("postArticleModify") 

    cy.contains("New Article").click()
    cy.get('[formcontrolname="title"]').type(title)
    cy.get('[formcontrolname="description"]').type("desp")
    cy.get('[formcontrolname="body"]').type("artificle")
    // cy.get('[placeholder="Enter tags"]').type("write2")
    cy.contains("Publish Article").click()

    /** wait responde */
    cy.wait("@postArticleModify").then(xhr => {
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.article.title).to.equal(title)
      expect(xhr.request.body.article.description).to.equal('Test a rai')
    })
    
    /** API Calling */
    it.only("",()=>{
      cy.get('@token').then( token => {
        console.log("check token" , token );

      })
    })
  })
})