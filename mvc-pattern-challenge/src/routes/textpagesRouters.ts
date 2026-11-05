import { Router } from "express";
import type { Request, Response } from "express";
const router = Router();

router.get("/contact", (_req: Request, res: Response) => {
  res.render("contact.html");
});

router.get("/about", (_req: Request, res: Response) => {
  res.render("about.html");
});

router.get("/example-post", (_req: Request, res: Response) => {
  res.render("postExample.html");
});

export default router;
