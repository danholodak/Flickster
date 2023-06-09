# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_15_201245) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "album_entries", force: :cascade do |t|
    t.bigint "photo_id", null: false
    t.bigint "album_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_album_entries_on_album_id"
    t.index ["photo_id"], name: "index_album_entries_on_photo_id"
  end

  create_table "albums", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "banner_id", null: false
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["banner_id"], name: "index_albums_on_banner_id"
    t.index ["user_id"], name: "index_albums_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "photo_id", null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["photo_id"], name: "index_comments_on_photo_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "photo_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["photo_id"], name: "index_favorites_on_photo_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "photos", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.boolean "showcase"
    t.integer "views"
    t.index ["title"], name: "index_photos_on_title"
    t.index ["user_id"], name: "index_photos_on_user_id"
  end

  create_table "testimonials", force: :cascade do |t|
    t.text "body", null: false
    t.bigint "author_id", null: false
    t.bigint "subject_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_testimonials_on_author_id"
    t.index ["subject_id"], name: "index_testimonials_on_subject_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "display_name", null: false
    t.string "email", null: false
    t.integer "age", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "last_name", null: false
    t.text "description"
    t.string "website"
    t.string "website_name"
    t.string "occupation"
    t.string "hometown"
    t.string "current_city"
    t.string "country"
    t.string "airport"
    t.string "facebook"
    t.string "twitter"
    t.string "instagram"
    t.string "pinterest"
    t.string "tumblr"
    t.index ["display_name"], name: "index_users_on_display_name", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "album_entries", "albums"
  add_foreign_key "album_entries", "photos"
  add_foreign_key "albums", "photos", column: "banner_id"
  add_foreign_key "albums", "users"
  add_foreign_key "comments", "photos"
  add_foreign_key "comments", "users", column: "author_id"
  add_foreign_key "favorites", "photos"
  add_foreign_key "favorites", "users"
  add_foreign_key "photos", "users"
  add_foreign_key "testimonials", "users", column: "author_id"
  add_foreign_key "testimonials", "users", column: "subject_id"
end
