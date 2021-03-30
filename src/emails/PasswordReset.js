const mjml = require('mjml');

/**
 *  @param clientIp
 *  Token for the password reset
 *  @param ipInfo
 */
module.exports = (clientIp, ipInfo) =>
  mjml(`<mjml>
  <mj-body background-color="#ffffff">
    <mj-section>
      <mj-column>
        <mj-text font-style="bold" font-size="24px" color="#626262" align="center">
          Password Has been chaanged
        </mj-text>
        <mj-divider border-color="#4f92ff" />
      </mj-column>
    </mj-section>
    <mj-wrapper padding-top="0">
      <mj-section>
        <mj-column>
          <mj-text>
            You are receiving this because you (or someone else) has changed your account paassword. If this was not you please contact support.
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>
          <mj-raw>
        <strong>IP (Click for more info)</strong>
        <a href="https://whatismyipaddress.com/ip/${clientIp}">
              ${clientIp}
            </a>\n
        <strong>City</strong> ${ipInfo.city}\n
        <strong>State</strong> ${ipInfo.region}\n
        <strong>Country</strong> ${ipInfo.country}\n
      </mj-raw>
  </mj-body>
</mjml>`);
