/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('feed URL is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url).not.toBe('');
            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feed name is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        it('ensures the menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* This test ensures the menu changes
         * visibility when the menu icon is clicked.
        */
        it('ensures the menu changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* This test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least a single .entry element within the .feed container', function() {
            // Find if there is at least 1 .entry elemet in .feed container
            expect($('.feed').find(".entry").length).toBeGreaterThan(0);
        });
    });

    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
        
    describe('New Feed Selection', function() {
        var firstNewsTitleList,
            secondNewsTitleList;
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0 ,function() {
                firstNewsTitleListText = $('.feed').find("h2").text();
                loadFeed(1 , function() {
                    secondNewsTitleListText = $('.feed').find("h2").text();
                    done();
                });
            });
        });
        it('ensures a new feed is loaded and the content actually changes', function(done) {
            expect(firstNewsTitleList).not.toEqual(secondNewsTitleList);
            done();
        });

    });
}());
