DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'vue_resume'
   ) THEN
      CREATE DATABASE vue_resume;
   END IF;
END
$$;