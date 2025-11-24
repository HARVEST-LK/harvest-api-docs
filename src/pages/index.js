import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout
      title="HARVEST API"
      description="Official Documentation for Harvest System API"
    >
      <header className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>HARVEST API</h1>
          <p className={styles.subtitle}>
            A modern REST API for managing Farmers, GN Divisions, AG Offices,
            Admins & File Uploads.
          </p>

          <Link className={styles.ctaButton} to="/docs/api/overview">
            View API Documentation →
          </Link>
        </div>
      </header>

      <main className={styles.mainSection}>
        <section className={styles.featuresSection}>
          <div className={styles.featuresGrid}>

            <div className={styles.featureCard}>
              <h3>Easy Integration</h3>
              <p>
                Clear, well-structured endpoints for quick and simple
                implementation.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3>Secure Authentication</h3>
              <p>
                Token-based authentication ensures safe & protected access.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3>File Upload Support</h3>
              <p>
                Upload and manage files effortlessly through the API.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3>Organized Data Models</h3>
              <p>
                Manage farmers, divisions, offices and admins with ease.
              </p>
            </div>

          </div>
        </section>
      </main>
    </Layout>
  );
}
