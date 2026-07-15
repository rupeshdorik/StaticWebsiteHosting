import boto3
import os
import mimetypes
from botocore.exceptions import ClientError, NoCredentialsError

# ==============================
# AWS S3 Bucket Name
# ==============================
BUCKET_NAME = "rupesh-static-website-2026"

# ==============================
# Website Folder Path
# ==============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEBSITE_FOLDER = os.path.join(BASE_DIR, "website")

# ==============================
# Create S3 Client
# ==============================
s3 = boto3.client("s3")


def upload_website():

    print("=" * 50)
    print("     STATIC WEBSITE DEPLOYMENT")
    print("=" * 50)

    # Check if website folder exists
    if not os.path.exists(WEBSITE_FOLDER):
        print("❌ Error: Website folder not found.")
        return

    files = os.listdir(WEBSITE_FOLDER)

    if len(files) == 0:
        print("❌ Website folder is empty.")
        return

    print(f"\nConnecting to Bucket : {BUCKET_NAME}")
    print("Connection Successful.\n")

    uploaded_files = 0

    for file in files:

        file_path = os.path.join(WEBSITE_FOLDER, file)

        content_type = mimetypes.guess_type(file_path)[0]

        if content_type is None:
            content_type = "binary/octet-stream"

        try:

            print(f"Uploading {file}...")

            s3.upload_file(
                file_path,
                BUCKET_NAME,
                file,
                ExtraArgs={
                    "ContentType": content_type
                }
            )

            print(f"✓ {file} uploaded successfully.\n")

            uploaded_files += 1

        except FileNotFoundError:
            print(f"❌ {file} not found.\n")

        except ClientError as e:
            print(f"AWS Error : {e}\n")

        except Exception as e:
            print(f"Unexpected Error : {e}\n")

    print("=" * 50)
    print("DEPLOYMENT COMPLETED")
    print("=" * 50)

    print(f"Bucket Name          : {BUCKET_NAME}")
    print(f"Files Uploaded       : {uploaded_files}")
    print(f"Website Folder       : {WEBSITE_FOLDER}")

    print("\nStatic Website Hosted Successfully!")
    print("=" * 50)


try:
    upload_website()

except NoCredentialsError:
    print("AWS Credentials Not Found.")