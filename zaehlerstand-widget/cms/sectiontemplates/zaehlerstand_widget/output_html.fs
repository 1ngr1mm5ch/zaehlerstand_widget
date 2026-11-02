<section class="zaehlerstand-teaser">
  $CMS_IF(!st_headline.isEmpty)$
    <h2 class="zaehlerstand-teaser__headline">$CMS_VALUE(st_headline.escape)$</h2>
  $CMS_END_IF$
  $CMS_IF(!st_text.isEmpty)$
    <div class="zaehlerstand-teaser__text">$CMS_VALUE(st_text)$</div>
  $CMS_END_IF$
  <div
    data-zaehlerstand-widget
    data-energy-type="$CMS_VALUE(st_energy_type.getKey())$"
    data-show-history="$CMS_VALUE(st_show_history)$"
    $CMS_IF(!st_success_message.isEmpty)$
      data-success-message="$CMS_VALUE(st_success_message.escape)$"
    $CMS_END_IF$
  ></div>
</section>
