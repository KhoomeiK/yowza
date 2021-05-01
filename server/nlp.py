import argparse

parser = argparse.ArgumentParser(description='Get text to find keywords for.')
parser.add_argument('-t', type=str, nargs='+',
                    help='text to extract keywords from')
args = parser.parse_args()

