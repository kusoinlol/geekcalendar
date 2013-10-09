<!DOCTYPE html>
<html>
  <head>
    <title>On This Day - {{ event['formatted_date'] }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="/static/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="/static/css/geekcalendar.css" rel="stylesheet" media="screen">
  </head>
  <body>
    <!-- Wrap all page content here -->
    <div id="wrap">

      <!-- Fixed navbar -->
      <div class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">On this day</a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><h1>{{ event['formatted_date'] }}</h1></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>

      <!-- Begin page content -->
      <div class="container"><br/><br/><br/><br/>
      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
        <h2>{{ event['short_description'] }}</h2>
      </div>
      </div>

    </div>

    <div id="footer">
      <div class="container">
        <p class="text-muted credit"><a href="">About this site</a></p>
      </div>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/static/js/bootstrap.min.js"></script>
  </body>
</html>
