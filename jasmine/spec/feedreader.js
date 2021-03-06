/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('has url', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe("");
      });
    });

    /* Loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('has name', function () {
      allFeeds.forEach(function (feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe("");
      });
    });
  });


  /* Test suite to side menu */
  describe('The menu', function () {
    /* Ensures the menu element is
     * hidden by default.
     */
    it('is hidden', function () {
      let hasClass = $('body').hasClass('menu-hidden');

      expect(hasClass).toBe(true);
    });

    /* Ensures the menu changes
     * visibility when the menu icon is clicked.
     */
    it('is clicked', function () {
      let menuButton = $('.menu-icon-link');

      menuButton.click();
      let hasClass = $('body').hasClass('menu-hidden');
      expect(hasClass).toBe(false);

      menuButton.click();
      hasClass = $('body').hasClass('menu-hidden');
      expect(hasClass).toBe(true);
    });
  });

  /* Initial entries test suite */
  describe('Initial Entries', function () {
    beforeEach(function (done) {
      loadFeed(0, function () {
        done();
      });
    });

    /* Ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('has at least an entry', function () {
      let amountEntries = $('.feed .entry').length;
      expect(amountEntries).toBeGreaterThan(0);
    });
  });

  /* New feed selection test suite */
  describe('New Feed Selection', function (done) {
    let oldName, oldUrl, newName, newUrl;
    beforeEach(function (done) {
      loadFeed(0, function () {
        oldName = $(".entry-link h2").first().text();
        oldUrl = $(".entry-link").first().attr('href');
        loadFeed(1, function () {
          newName = $(".entry-link h2").first().text();
          newUrl = $(".entry-link").first().attr('href');
          done();
        });
      });
    });

    /* Ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Obs: loadFeed() is asynchronous.
     */
    it('content changed', function () {
      expect(oldName).not.toEqual(newName);
      expect(oldUrl).not.toEqual(newUrl);
    });
  });
}());
