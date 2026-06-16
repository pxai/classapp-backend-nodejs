CREATE TABLE domains (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE permissions (
  domain_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  role INTEGER NOT NULL,
  CHECK (role IN (0, 1, 2)),
    CONSTRAINT fk_permissions_domain
      FOREIGN KEY (domain_id)
      REFERENCES domains(id)
      ON DELETE CASCADE,
  CONSTRAINT fk_permissions_user
      FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);