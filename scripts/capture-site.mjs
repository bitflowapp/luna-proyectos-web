import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
process.env.TEMP = process.env.TMP = resolve(".tmp");
for (const dir of [
  "artifacts/screenshots-desktop",
  "artifacts/screenshots-mobile",
  "artifacts/social",
  "public/social",
])
  await mkdir(dir, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.goto("http://127.0.0.1:4173/luna-proyectos-web/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "artifacts/screenshots-desktop/desktop-first-look.png",
  });
  for (const id of ["taba", "oficio", "bit-flow", "catalogo", "contacto"]) {
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({
      path: `artifacts/screenshots-desktop/section-${id}.png`,
    });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/luna-proyectos-web/');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({
    path: "artifacts/screenshots-mobile/mobile-first-look.png",
  });
  const data = async (path, type = "image/webp") =>
    `data:${type};base64,${(await readFile(path)).toString("base64")}`;
  const font = await data(
    "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
    "font/woff2",
  );
  const serif = await data(
    "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
    "font/woff2",
  );
  const taba = await data("public/media/taba-desktop.webp");
  const oficio = await data("public/media/oficio-agenda.webp");
  const common = `@font-face{font-family:Manrope;src:url(${font})} @font-face{font-family:Editorial;src:url(${serif});font-style:italic}*{box-sizing:border-box}body{margin:0;background:#f8f6f0;color:#20211f;font-family:Manrope,Arial}em{font-family:Editorial;font-weight:400;color:#2549eb}.logo{font-weight:800;letter-spacing:-5px;font-size:56px}.logo i{color:#2549eb;font-style:normal}.eyebrow{font-size:13px;letter-spacing:3px;font-weight:700}.footer{display:flex;justify-content:space-between;border-top:1px solid #ccc9be;padding-top:22px;font-size:14px}.image{overflow:hidden;box-shadow:0 18px 48px #28282428;border-radius:8px}img{width:100%;display:block}`;
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(
    `<html lang="es"><style>${common}.layout{padding:50px 58px}.logo{font-size:46px}h1{font-size:76px;letter-spacing:-4px;line-height:1.05;margin:53px 0 24px;width:610px}h1 em{font-size:90px}p{font-size:18px;line-height:1.8;width:390px}.stage{position:absolute;right:45px;top:110px;width:430px;height:385px;background:#e9e5d9;border-radius:5px}.desktop{position:absolute;left:-18px;top:44px;width:380px;transform:rotate(-3deg)}.phone{position:absolute;right:15px;top:170px;width:130px;border:4px solid #242924;transform:rotate(5deg);border-radius:14px}.footer{position:absolute;bottom:40px;left:58px;right:58px}</style><div class="layout"><div class="logo">LUNA<i>·</i></div><h1>Software para<br/>trabajo <em>real.</em></h1><p>Apps, sistemas y automatizaciones<br/>para negocios.</p><div class="stage"><div class="desktop image"><img src="${taba}"/></div><div class="phone image"><img src="${oficio}"/></div></div><div class="footer"><span>NEUQUÉN, ARGENTINA</span><span>@lunaaproyectos</span><span>Pantallas reales · Datos demo</span></div></div></html>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "public/social/luna-og.jpg",
    type: "jpeg",
    quality: 90,
  });
  await page.screenshot({ path: "artifacts/social/luna-og.png" });
  const desktop = await data(
    "artifacts/screenshots-desktop/desktop-first-look.png",
    "image/png",
  );
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.setContent(
    `<html lang="es"><style>${common}.layout{padding:65px}.top{display:flex;align-items:center;justify-content:space-between}h1{font-size:86px;font-weight:550;letter-spacing:-5px;line-height:1.07;margin:50px 0 32px}h1 em{font-size:104px}.site{margin:35px 0 32px;border:1px solid #d2d0c4;border-radius:8px;box-shadow:0 22px 65px #34332320}p{font-size:24px;line-height:1.6;max-width:700px;margin:0 0 40px}.footer{font-size:17px}.blue{color:#2549eb}</style><div class="layout"><div class="top"><div class="logo">LUNA<i>·</i></div><span class="eyebrow">NUESTRA NUEVA WEB</span></div><h1>Lo construimos.<br/><em>Ahora podés verlo.</em></h1><div class="site"><img src="${desktop}"/></div><p>Software real, pensado alrededor<br/>de cómo trabaja cada negocio.</p><div class="footer"><span class="blue">Mirá los proyectos en el enlace de la bio ↗</span><span>@lunaaproyectos</span></div></div></html>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "artifacts/social/instagram-feed-1080x1350.png",
  });
  const mobile = await data(
    "artifacts/screenshots-mobile/mobile-first-look.png",
    "image/png",
  );
  await page.setViewportSize({ width: 1080, height: 1920 });
  await page.setContent(
    `<html lang="es"><style>${common}.layout{padding:110px 80px}.top{display:flex;align-items:center;justify-content:space-between}h1{font-size:87px;letter-spacing:-4px;font-weight:550;line-height:1.1;margin:85px 0 60px}.phone{width:530px;margin:auto;border:7px solid #292b25;border-radius:30px;overflow:hidden;box-shadow:0 20px 80px #36332735}.cta{font-size:31px;background:#2549eb;color:white;padding:27px 34px;margin-top:60px;text-align:center;border-radius:5px}p{font-size:21px;text-align:center;line-height:1.8;margin-top:28px}</style><div class="layout"><div class="top"><div class="logo">LUNA<i>·</i></div><span class="eyebrow">SOFTWARE REAL</span></div><h1>Podés venir<br/><em>con un problema.</em></h1><div class="phone"><img src="${mobile}"/></div><div class="cta">Conocé lo que construimos ↗</div><p>@lunaaproyectos<br/>Mirá los proyectos. Contanos tu problema.</p></div></html>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "artifacts/social/instagram-story-1080x1920.png",
  });
  console.log("Website captures, Open Graph and Instagram assets generated.");
} finally {
  await browser.close();
}
