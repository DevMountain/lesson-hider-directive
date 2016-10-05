<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# lesson-hider-directive

## Objective

Create a simple directive that modifies a template

Today we will be building a custom directive that checks whether a lesson is already in the provided schedule, and strikes through that lesson if it is. We will
cover the fundamentals of directives and demonstrate a real-world use case that will allow you to better understand the power of directives.

![alt text](https://github.com/DevMountain/lesson-hider-directive/blob/master/preview.png?raw=true, "Example of the directive in use.")

## Step 1: Initializing the file structure

All that is provided is the schedule.json and app.js, so let's start by laying out the skeleton of our app. We will need:

* 'index.html'
* 'lessonCtrl.js'
* 'lessonService.js'
* 'lessonHider.js'

Let's start out by creating those files and setting up the necessary basics such as initializing the app and controller.

## Step 2: Starting your directive

Let's continue by creating your directive. You will use the directive method on your angular module (just like you do when creating controllers and services).
This method takes two parameters: a string that will be the name of your directive, and a callback function which will return an object. It should look
something like this:

```javascript
angular.module('directivePractice')
.directive('lessonHider', function() {
  return {

  }
});
```

Looking pretty familiar, right? So let's test it and make sure it works! Start out by creating a new file named `lessonHider.html` and adding some text. Once
you have that done we can add a property called `templateUrl: ` to our directive's return object. Point the templateUrl to your newly created
`lessonHider.html`. Now all we need to do is add the directive to our `index.html` to see if it works. Remember that directives are converted to snake-case in
html!

If you are not seeing the text in your `lessonHider.html` it's time to double check your steps. Did you remember to add your `lessonHider.js` to your
`index.html`? Did you convert your directive to snake-case? Is the file path in your templateUrl property correct?

Your directive in your html should look like this: `<lesson-hider></lesson-hider>`

It can be helpful to think of a directive as a self contained route: Wherever you place that directive, it will display the html template you have given it.
Before moving on to adding functionality, let's add the `restrict` property to our directive's return object. Restrict determines how you can use the directive
in your DOM. There are three options: `'E'`, `'A'`, and `'C'`. These stand for Element, Attribute, and Class.

A directive that has `restrict: 'E'` (note that 'E' is a string) can only be used in your html as an element, like we have above.

Think through Angular's built in directives such as ng-repeat or ng-options. These are used with the `'A'` restriction because they are passed as attributes to
existing elements. Directives as classes (and especially as comments) are less common, and should usually be avoided. For now, let us just restrict our
lessonHider directive to only be an Element.

## Step 3: Adding functionality

So far our directive is displaying some text, but it isn't doing much else, so let's bring it up a level! Inside your `lessonCtrl` let's add an array of lessons
to your `$scope`. Give the lessons array these values:

```javascript
['Services', 'Routing', 'Directives', 'Review', 'Firebase', 'No server project', 'Node', 'Express', 'Mongo'];
```

Now inside of our directive's template we can display the array of lessons the same way we would in any of our other html. Add the lessons array to the template
and reload the page to make sure it prints out what we want.

Cool! But still not much that's new, so let's dive a little deeper. Inside of your `lessonHider.js` add another property to your return object called `link` and
give it the value of a function. The link method will always be passed three parameters: `scope`, `element`, and `attributes`, in that order. At this point your
directive should look like this:

```javascript
angular.module('directivePractice')
.directive('lessonHider', function() {

  return {
    templateUrl: 'lessonHider.html',
    restrict: 'E',
    link: function( scope, element, attributes ) {

    }
  }

});
```

Unlike dependency injection used elsewhere in Angular these parameter names don't carry specific meaning. The first parameter represents the `$scope` of your
directive, the second is the html element that wraps your directive, and the third is an object containing all the properties and values of the attributes on
your directive in the DOM.

Remember that data is passed to directives through attributes on the element. So in our html let's add an attribute named `my-test` and give it a value of
`Hello there!`. Just like this: `<lesson-hider my-test="Hello there!"></lesson-hider>`

Now inside of your link method let's console log the three parameters (scope, element, attributes), check out the console, and see what we're getting. The scope
will log out an object containing angular properties, the element will log out the actual DOM element itself, and you will be able to see that the attributes
logs out your myTest attribute and value. You can also see that Angular has done its magic in converting the snake-case in your html to camelCase.

Once you're done browsing through the results of your `console.log()` feel free to remove it and the my-test attribute before we move on to the next step. We
wont be using them anymore.

## Step 4: Isolating scope

Ideally, directives can be re-used in multiple places throughout a project. One of the greatest benefits of a well written directive is its pluggability. Like a
function, you can use the same directive in several different areas for slightly different values. Unfortunately this can lead to issues as you might want to
use differently named data in different areas of your project. So saying `{{ lessons }}` might work fine on the current controller, but what if we wanted to use
it elsewhere where we didn't have a lessons array?

Angular's work-around to this problem lies in something called Isolate Scope. Isolate Scope cuts the directive off from the parent controller (lessonCtrl in
this case) and only allows the directive to use data we explicitly pass to it. To isolate scope, all we need to do is add a `scope:` property to our directive's
return object and give that `scope:` property the value of an object. Here is what the directive should look like after adding `scope:`:

```javascript
angular.module('directivePractice')
.directive('lessonHider', function() {

  return {
    templateUrl: 'lessonHider.html',
    restrict: 'E',
    scope: {

    },
    link: function( scope, element, attributes ) {

    }
  }

});
```

Once you have added the `scope:` property you will see that the directive is no longer displaying `{{ lessons }}`. This is because our directive no longer has
access to lessonCtrl and therefore no longer has access to the `$scope.lessons` array. That's ok! We'll fix it soon!

A quick refresher on the different scope options here:

```javascript
scope: {
  twoWayDataBinding: '=',
  stringBinding: '@',
  functionBinding: '&'
}
```

Two-way data binding means that our directive and its parent controller (lessonCtrl in this case) are in constant communication when the value passed in
changes. Any changes made will be reflected both in the controller and inside the directive.

A string binding simply tries to grab the string value that is passed to it.

A function binding allows you to pass a function from the controller into your directive.

So let's give our new `scope:` object a key-value pair with the key being `lesson:` and the value being `'='`. What we are doing here is telling our directive
that we plan on having an attribute named `lesson` and we want to create a two way data binding between our directive and the parent controller on whatever
value is passed to that attribute. To demonstrate this two way binding we first need to pass our directive a `lesson` attribute and give that attribute a value.

In our `lessonCtrl` let's create a new property on the `$scope` and call it 'test', we will give this a value of `'Two-way data binding!'`. Now let's add `{{
  test }}` to a new `<div>` inside our index.html. You should see your page update with 'Two way data binding!'. To get this to display inside of our directive
  as well, we need to add an attribute to our directive inside our index.html. So let's add the `lesson` attribute to our directive and pass it the value
  `'test'`. If you don't remember how to do this, look back to the previous section when you used the `my-test` attribute.

Now all we need to do to display our string is add it to the `lessonHider` template. So inside of `lessonHider.html` let's add `{{ lesson }}`. You should see a
second 'Two way data binding!' show up on your page. The reason we use 'lesson' here instead of 'test' is because our directive can no longer talk to our
controller. It only knows the values we give it, and we have passed `$scope.test` to our directives `lesson` attribute, so we can only access it by `lesson`.

There is only one more step to demonstrate what I mean by two-way data binding. Let's create an input box inside of our directive and give it an `ng-model` of
`lesson`. Now by typing in the input box you can see that the changes you make affect both `$scope.test` AND `lesson`!

## Step 5: Adding even more functionality!

So now we know how to set up the basic layout of a directive, give it a template, isolate the scope, and pass it data! Pretty impressive, but we aren't done
yet. Our directive still doesn't really DO much. So let's fix that now.

First things first: let's wrap our directive (in our index.html) in a `<ul>` tag and add an `ng-repeat` to our directive, repeating over the lessons array in
your `lessonCtrl`. Don't worry! `ng-repeat` will work on our directive just like it would on any other element. Next we will pass each lesson in the array to
our `lesson` attribute on the directive.

`index.html`:
```
<ul>
	<lesson-hider ng-repeat="lesson in lessons" lesson="lesson"></lesson-hider>
</ul>
```

For formatting purposes we'll also want to add `<li>` tags to our lessonHider.html.

`lessonHider.html`:
```
<li>{{ lesson }}</li>
```

When you reload the page you should see a list of all the different lessons from your lessons array. We're ready to push on!

What we are going to do now is add a controller to our directive. Simply add the key `controller:` to our directive's return object and give it the value of a
function. This may seem a little strange, but we can treat this controller the same way as we do any other controller we are used to using. The only difference
is that this controller can only apply to this directive. Knowing that this controller is the same as what we are used to working with, let's inject `$scope`
and `lessonService` just like we're used to.

Since we're injecting `lessonService`, let's go add the function we need. Create a method named `getSchedule` that simply returns a GET request to your
schedule.json (You probably haven't done an $http request to one of your own files before, but it works just the same. `return $http.get('schedule.json');`).

Because we've injected `lessonService` into our directive's controller we can now access that function in the same way we are used to in other controllers.
Let's assign the return value of `lessonService.getSchedule()` to a new value called `$scope.getSchedule`. You may have noticed that we still haven't called a
`.then` yet--we're almost there!

## Step 6: Utilizing the link function

If you've forgotten along the way what our directive is going to be doing, here's a reminder: We are going to check whether a lesson is already in the schedule,
and if it is, we will cross it out.

Inside of our link function we can now access our `getSchedule` value on our scope. Remember that `scope` inside our link function is referencing the entire
scope of the directive, so our link function and controller can talk to each other. `scope.getSchedule` is the same value as `$scope.getSchedule`; you can even
change the parameter name inside your link function to make it more clear.

Because our `getSchedule` value is still a promise we can now use a `.then` and assign the return value to our scope. So let's set `getSchedule.then`'s return
value to a property on the scope named `scope.schedule`.

Your directive should now look something like this:

```javascript
angular.module('directivePractice')
.directive('lessonHider', function() {

  return {
    templateUrl: 'lessonHider.html',
    restrict: 'E',
    scope: {
      lesson: '='
    },
    controller: function( $scope, lessonService ) {
      $scope.getSchedule = lessonService.getSchedule();
    },
    link: function( scope, element, attributes ) {
      scope.getSchedule.then(function( response ) {
        scope.schedule = response.data;
      });
    }
  }

});
```

Now we have all the data we need for basic functionality! Time to make use of that data inside our link function. The link function in directives is primarily
used when you need to manipulate the DOM, and it will feel a lot like jQuery (because Angular is using a pared down version of jQuery called jqLite). So now
we're going back to some basics.

First of all we will need to loop through our schedule array and check whether `scope.lesson` matches a lesson that is already scheduled. If we find the value
then we need to do some basic jQuery to strike through that list item. It's also a good idea to tell your function to also `return;` if it finds the value,
preventing your loop from continuing to run after you've found the lesson.

Our directive now has functionality and is an example of a real world use case! But there's still more we can do!

## Step 7: Passing a function to our directive

What if the user wants to know on which day a lesson would be active? Right now all they know is that some lessons are active somewhere in the schedule. Let's
fix this!

Before adding more functionality, let's make sure we're up to speed. Here is what your directive should look like now:

```javascript
angular.module('directivePractice')
.directive('lessonHider', function() {

  return {
    templateUrl: 'lessonHider.html',
    restrict: 'E',
    scope: {
      lesson: '='
    },
    controller: function( $scope, lessonService ) {
      $scope.getSchedule = lessonService.getSchedule();
    },
    link: function( scope, element, attributes ) {

      scope.getSchedule.then(function( response ) {
        scope.schedule = response.data;

        scope.schedule.forEach(function( scheduleDay ) {
          if (scheduleDay.lesson === scope.lesson) {
            element.css('text-decoration', 'line-through');
            return;
          }
        });
      });

    }
  }

});
```

First we will need to add a new property onto our scope object. Let's call this property `dayAlert:`. We will be passing this value a function, so remember that
we want to use the `'&'` instead of the `'='`. Now that we have that property on our scope, we need to give it a value, so let's go back to our `lessonCtrl` and
write a new function named `announceDay()`. This function will be nice and simple. It should take two parameters: lesson and day. It should alert `lesson + ' is
active on ' + day + '.'`.

Our next step is to pass this new function to our directive. Don't forget that Angular will swap camelCase to snake-case in your html! The directive element
inside your index.html should now look something like this:

```html
<lesson-hider ng-repeat="lesson in lessons" lesson="lesson" day-alert="announceDay(lesson, day)"></lesson-hider>
```

Now that we have access to our new function inside of our directive we need to change a few things. First off, we will need to save a reference to the lesson's
day on our scope. So inside our link function's `if` statement we will create a new property called `scope.lessonDay` and set it equal to the day in the
schedule's `weekday` property. With this reference we are ready to make `dayAlert` available to our users.

Inside our directive's template, let's add a button element and give that element an ng-click attribute with the value of `ng-click="dayAlert({ lesson: lesson,
day: lessonDay })"`. This syntax is a little strange, but it is just a quirk of directives.

We pass the function call a single object with key names that match the parameter names we gave `day-alert` in our html and then give those keys the values of
the arguments we would like to pass to the function. In this case we want to pass our `scope.lesson` property as the first argument to `lesson` and our
`scope.lessonDay` property as the second argument that will be passed to `day`.

## Step 8: Next steps

Congratulations! You have written a new custom directive that utilizes the restrictions, a templateUrl, isolate scope, a controller, and a link function!
Directives can be a lot to wrap your head around, so here are a few options to familiarize yourself further:

1. Try to fix out `dayAlert()`, which currently alerts `'Lesson is active on undefined'` if we select a lesson that's not in the schedule.
1. Add a checkbox to toggle whether lessons in the schedule are crossed out or not.
1. Allow users to remove lessons from the schedule; have your directive update when a lesson is removed.

Directives are an incredibly intricate and powerful piece of AngularJS, so keep practicing and searching out new use-cases for them. Once again, congratulations
on your first fully-fledged custom directive!

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master
repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly
prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original
content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
