describe("Purchase", function() {

  describe("initialize", function() {
    it("will ouput the item purchased and the price", function() {
      var testPurchase = Object.create(Purchase);
      testPurchase.initialize("water",1).should.equal("water $1.00")
    });
  })
})

describe("Category", function() {
  describe("initializeCat", function() {
    it("will tell the name of the Category", function() {
      var testCategory = Object.create(Category);
      testCategory.initializeCat("Entertainment").should.equal("Entertainment")
    });
  });
});
