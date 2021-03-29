const mjml = require('mjml');

/**
 *  @param ipInfo
 *  @description IP infomation
 *  @param device
 *  @description Device infomation
 */
module.exports = (ipInfo, device) =>
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
            You are receiving this because you changed your account password. If this was not you please contact the webmaster.
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-table>
            <tr>
              <td>IP</td>
              <td>City, State Country</td>
              <td>System</td>
            </tr>
            <tr>
              <td>
                <a href="${
                  !ipInfo.localhost
                    ? `https://whatismyipaddress.com/ip/${ipInfo.ip}`
                    : 'https://whatismyipaddress.com/localhost'
                }">
     ${ipInfo.localhost ? 'localhost' : ipInfo.ip}
          </a>
              </td>
              <td>${
                !ipInfo.localhost
                  ? `${ipInfo.city}, ${ipInfo.state} ${ipInfo.country}`
                  : 'Unable to get'
              }
              </td>
              <td>${device.browser} on ${device.os}</td>
            </tr>
          </mj-table>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>`);
